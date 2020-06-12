# Welcome To WakeCap Backend Challenge

## Assumptions
* Frist Asset every starting day send the duration will be 0.

## Non-functional requirements
make sure that port 3000 for node server and 27017 mongodb are free and not used by other apps.

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

9- Enjoy with postman collection {{projectDir}}/wakeCap.postman_collection.json attached with project or find it [here](https://www.getpostman.com/collections/d1559ea2b200bd7a3ac3)

* Output of daily reports generated under {{ProjectDir}}/reports directory grouped by Client name. 

***

* Can check routes/reports/report.controller.js functions ```getTimeZoneCode()```,```getLateQueryResult() ```has good business description 


***
## Project Source Tree


```bash
ProjectDirRoot
├───bin/
│   └───www──────────────────────────────────>>server config
├───config/
│   └───mongoose.js──────────────────────────>>database connection config
├───constants/
│   ├───http-responses.constants.js──────────>>common HTTP Status Code definition 
│   └───response-formate.constants.js────────>>common Response Template formate
├───models/──────────────────────────────────>>contains models schema definitions
│   ├───AssetsDetails.js─────────────────────>>database Model Schema
│   ├───ClientDetails.js─────────────────────>>database Model Schema
│   ├───SiteDetails.js───────────────────────>>database Model Schema
│   └───WorkerDetails.js─────────────────────>>database Model Schema
├───public/──────────────────────────────────>>auto generate for HTML
│   ├───images/
│   ├───javascripts/
│   └───stylesheets/
│       └───style.css
├───reports/─────────────────────────────────>>generate daily reports path
│   └───Al_Futtaim/──────────────────────────>>client name (dynamic Generated)
│       └───Khalifa_Tower-1-June-2020.json───>>site name with date
├───routes/──────────────────────────────────>>API routes
│   ├───clients-details/
│   │   ├───client.controller.js─────────────>>contains logic of end point
│   │   ├───client.router.js─────────────────>>contains url for end point
│   │   ├───client.service.js────────────────>>contains database queries
│   │   └───client.validate.js───────────────>>contains JOI request params validation
│   ├───reports/
│   │   ├───report.controller.js─────────────>>contains logic of end point
│   │   ├───report.router.js─────────────────>>contains url for end point
│   │   ├───report.service.js────────────────>>contains database queries
│   │   └───report.validate.js───────────────>>contains JOI request params validation
│   ├───site-details/
│   │   ├───site.controller.js───────────────>>contains logic of end point
│   │   ├───site.router.js───────────────────>>contains url for end point
│   │   ├───site.service.js──────────────────>>contains database queries
│   │   └───site.validate.js─────────────────>>contains JOI request params validation
│   ├───worker-assets/
│   │   ├───assets.controller.js─────────────>>contains logic of end point
│   │   ├───assets.router.js─────────────────>>contains url for end point
│   │   ├───assets.service.js────────────────>>contains database queries
│   │   └───assets.validate.js───────────────>>contains JOI request params validation
│   ├───workers-details/
│   │   ├───worker.controller.js─────────────>>contains logic of end point
│   │   ├───worker.router.js─────────────────>>contains url for end point
│   │   ├───worker.service.js────────────────>>contains database queries
│   │   └───worker.validate.js───────────────>>contains JOI request params validation
│   └───wakeCap.routes.js────────────────────>>contains registration of all routers files
├───test/
│   └───unitTest.js──────────────────────────>>unit test cases
├───views/───────────────────────────────────>>auto generate for frontend
│   ├───error.jade
│   ├───index.jade
│   └───layout.jade
├───.dockerignore
├───.eslintrc.json───────────────────────────>>ESLint configuration
├───Dockerfile───────────────────────────────>>docker image config
├───README.md────────────────────────────────>>WE ARE HERE :) 
├───app.js───────────────────────────────────>>application sequence of middlewares
├───docker-compose.debug.yml─────────────────>>for debug over docker
├───docker-compose.yml───────────────────────>>config for mongodb image and wake-cape node image
├───package.json─────────────────────────────>>project libraries and versions
└───wakeCap.postman_collection.json──────────>>postman collection of all end points
```
Good Chance :)
