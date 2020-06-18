const { ObjectId } = require('mongoose').Types;
const service = require('./report.service');
const siteService = require('../site-details/site.service');

const HttpResponsesConst = require('../../constants/http-responses.constants');
const formatResponse = require('../../constants/response-formate.constants').formatResponse;

var cron = require('node-cron');
var fs = require('fs');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


async function startSchedule() {
	//every hour runs at minute 0, second 0
	cron.schedule('0 0 * * * *', async () => {
		let nowInUTC = new Date();
		//timezone range in wrold (UTC−12:00 to UTC+14:00),
		let timeZones = await siteService.getAllSites({ timezone: { $in: getTimeZoneCode(nowInUTC.getUTCHours()) } });
		timeZones.forEach(tz => generateReport(tz));
	});
}

/**
 * this function will return utc difference between now and other location which has midnight now for example
 *  
 * 	+++ if now in UTC 20:00 so in Dubai 00:00AM and when schedule run at 20:00 should generate for Dubai Zone as in now Dubai is Midnight---> +4
 *
 *   now Hour UTC -------------zone now with midnight 00:00
 * 		|							  |
 * 	
 * 		0      ===================  [ 0 ]
 * 		1      ===================  [ -1 ]
 * 		2      ===================  [ -2 ]
 * 		3      ===================  [ -3 ]
 * 		4      ===================  [ -4 ]
 * 		5      ===================  [ -5 ]
 * 		6      ===================  [ -6 ]
 * 		7      ===================  [ -7 ]
 * 		8      ===================  [ -8 ]
 * 		9      ===================  [ -9 ]
 * 		10     ===================  [ -10, +14 ]
 * 		11     ===================  [ -11, +13 ]
 * 		12     ===================  [ -12, +12 ] ---> ignore utc-12 as there is no countires on this zone only "Baker Island" with 0 people :)
 * 		13     ===================  [ +11 ]
 * 		14     ===================  [ +10 ]
 * 		15     ===================  [ +9 ]
 * 		16     ===================  [ +8 ]
 * 		17     ===================  [ +7 ]
 * 		18     ===================  [ +6 ]
 * 		19     ===================  [ +5 ]
 * 		20     **ABOVE*^*EXAMPLE**  [ +4 ]
 * 		21     ===================  [ +3 ]
 * 		22     ===================  [ +2 ]
 * 		23     ===================  [ +1 ]
 */
function getTimeZoneCode(houtUTC) {
	let rs = [];
	if (houtUTC >= 0 && houtUTC <= 11)
		rs.push(-1 * ((houtUTC) % 12));//from 0 to 12
	if (houtUTC >= 10)
		rs.push(((24 - houtUTC) % 24));//from 10 to 23
	return rs;
}


async function generateReport(siteDetail) {
	let siteId = siteDetail._id.toString();
	let [startDate, endDate] = getStartAndEndDate();

	const [absentWorkers, lateWorkers, activeHoursForWorkers, inactiveHoursForWorkers] = await Promise.all([
		getAbsentQueryResult(siteId, startDate, endDate),
		getLateQueryResult(siteId, siteDetail.startingHour, siteDetail.lateThreshold, startDate, endDate),
		getActiveHoursQueryResult(siteId, startDate, endDate),
		getInactiveHoursQueryResult(siteId, startDate, endDate)
	])
	generateReportPDF(
		absentWorkers, lateWorkers, activeHoursForWorkers, inactiveHoursForWorkers, siteDetail.name, siteDetail.clientDetail.name
	);
}

function getStartAndEndDate() {
	let startingDate = new Date();
	startingDate.setUTCHours(0);
	startingDate.setMinutes(0);
	startingDate.setSeconds(0);
	startingDate.setMilliseconds(0);

	let endDayHour = new Date();
	endDayHour.setUTCHours(23);
	endDayHour.setUTCMinutes(59);
	endDayHour.setUTCSeconds(59);
	endDayHour.setUTCMilliseconds(999);

	return [startingDate, endDayHour]
}


async function getAbsentQueryResult(siteId, startDate, endDate) {

	let query = [
		{ "$match": { "siteDetail._id": siteId, "createdAt": { "$gt": startDate, "$lt": endDate } } },
		{
			"$match": {
				"_id": {
					"$nin": (await service.distinctAssetDetail("worker_id", { "workerDetail.siteDetail._id": siteId })).map(_id => { return new ObjectId(_id) })
				}
			}
		}
	]
	return await service.aggergateWorkerDetail(query);
}

async function getLateQueryResult(siteId, startingHour, lateThreshold, startingDate, endDayHour) {

	/*


	-- Case 1 early attendance: 
timeline:	------||-------------------------(*)----------------------------||--------------
		StartingHoure=9.00        firstAssetAt=9.05Am	        lateThreshold=1Hour=10.00
											duration = 0
	

			+++++++++++++++++++++++++++++++
	

	-- Case 2 late attendance: should get in query
timeline:	 ------||-------------------------||-----------------------------(*)---------
                StartingHoure=9.00        lateThreshold=1Hour=10.00		firstAssetAt = 10.20Am
											duration = 0	


	*/

	startingDate.setUTCHours(startingHour + lateThreshold);// start at 9.00 and lateThreshold one hour
	let query = {
		duration: 0,//assumtion first asset per day is 0
		"workerDetail.siteDetail._id": siteId,
		"createdAt": { "$gt": startingDate, "$lt": endDayHour }
	};
	return await service.findAssetDetail(query);
}

async function getActiveHoursQueryResult(siteId, startDate, endDate) {
	let query =
		[
			{ $match: { "workerDetail.siteDetail._id": siteId, is_active: true, "createdAt": { "$gt": startDate, "$lt": endDate } } },//----------
			{ $group: { _id: null, sum: { $sum: "$duration" } } }
		]

	return convertSecondsToHours(await service.aggregateAssetDetail(query));
}

async function getInactiveHoursQueryResult(siteId, startDate, endDate) {
	let query =
		[
			{ $match: { "siteDetail._id": siteId, is_active: false, "createdAt": { "$gt": startDate, "$lt": endDate } } },
			{ $group: { _id: null, sum: { $sum: "$duration" } } }
		]

	return convertSecondsToHours(await service.aggregateAssetDetail(query));
}

function convertSecondsToHours(resultAggregateSumQuery) {
	//[ { _id: null, sum: 180 } ]
	let sumValue = 0;
	if (resultAggregateSumQuery.length > 0) {
		sumValue = (resultAggregateSumQuery[0].sum) / 3600;//convert second to hours
	}
	return sumValue.toFixed(2) + "  Hours(s)";//example 0.03888888888888889 ---toFixed(2)---> 0.04
}

/**
 * 
 * save reports to file on fileSystems
 */
function generateReportPDF(absentWorkers, lateWorkers, activeHoursForWorkers, inactiveHoursForWorkers, siteName, clientName) {
	absentWorkers.map(e => delete e.siteDetail);//no needed
	let data = { absentWorkers, lateWorkers, activeHoursForWorkers, inactiveHoursForWorkers };

	let day = new Date();
	let fileName = day.getDate() + "-" + monthNames[(day.getMonth())] + "-" + day.getFullYear();
	const dir = `${global.__base}/reports/${clientName}`;
	const fullPath = `${dir}/${siteName}-${fileName}.json`
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	fs.writeFile(fullPath, JSON.stringify(data, null, 4), (err) => {
		if (err) console.log(err);
		else console.log(`Report Generated ${global.__base}/reports/${siteName}-${fileName}.json`);
	}); //enhancemt for JasperReport PDF
}



async function listReports(req, res) {
	const reqQuery = req.params;
	getDirectories(reqQuery.siteName, function (err, rs) {
		if (err) {
			formatResponse(res, HttpResponsesConst.InternalServerError, err);
		} else {
			let metaData;
			if (reqQuery.siteName)
				metaData = "http://localhost:3000/report/" + reqQuery.siteName + "/";
			else
				metaData = "http://localhost:3000/report/";
			formatResponse(res, HttpResponsesConst.OK, rs.map(dir => { return metaData + dir }));
		}
	});
}

async function readReport(req, res) {
	const reqQuery = req.params;
	let reportDetail = fs.readFileSync(`${global.__base}/reports/${reqQuery.siteName}/${reqQuery.fileName}`);
	return formatResponse(res, HttpResponsesConst.OK, (JSON.parse(reportDetail)));
}


function getDirectories(siteName, cb) {
	fs.readdir(siteName ? `${global.__base}/reports/${siteName}` : `${global.__base}/reports/`, (err, files) => {
		cb(err, files);
	});
}




module.exports = {
	startSchedule,
	listReports,
	readReport
};