# Welcome To WakeCap Backend Challenge

## Assumptions
* Frist Asset every starting day send the duration will be 0.

## Non-functional requirements
make sure that port 3000 for node server and 27017 mongodb

## (A) Auto Installation Using Docker Compose.
1- Install ```docker``` and ```docker-compose``` depends on your OS,  for docker check [here](https://docs.docker.com/get-docker/), and for docker-compose [here](https://docs.docker.com/compose/install/)

2- Extract or clone project and open bash inside base directory.

3- Excute ```$ docker-compose up```

4-Enjoy with postman collection {{projectDir}}/wakeCap.postman_collection.json attached with project or find it [here](https://www.getpostman.com/collections/d1559ea2b200bd7a3ac3)


## (B) Manual Installation.

1- Install and configure Node.js engine version 12.16.1 or higher, see [download page](https://nodejs.org/en/download/).

2- Install and configure MongoDB version 3.6.8 or higher, see [download page](https://www.mongodb.com/try/download).

3- Extract or clone project and open bash inside base directory

4- Execute ```$ npm install``` to build project and install required dependencies.

5- Check file ```/{{ProjectDir}}/config/mongoose.js``` if you have custom installation for MongoDB.

6- Execute ```$./node_modules/.bin/eslint .``` inside ProjectDir to check ESLint syntax.

7- Execute ```$ npm test``` to run test cases.

8- Execute ```$ npm start``` to run the server.

10- Enjoy with postman collection {{projectDir}}/wakeCap.postman_collection.json attached with project or find it [here](https://www.getpostman.com/collections/d1559ea2b200bd7a3ac3)

* Output of daily reports generated under {{ProjectDir}}/reports directory grouped by site name. 

***

* Can check routes/reports/report.controller.js functions ```getTimeZoneCode()```,```getLateQueryResult() ```has good business description 


Good Chance :)
