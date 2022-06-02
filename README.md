# Project Title

kinesso Backend Test TeEmployee payslip pay cycle

### Includes

- Node
- mocha installed globally: $ npm install -g mocha


### Installing
- Clone kinesso-back-end-test  
    the repo and `cd kinesso-back-end-test`

- Run `npm install` to install all the dependencies.

- Run `npm start`. This will start a node server on port 4000


### Folder structure

    .
    ├── bin                    # Rest api's folder
    │   ├── www
    ├── server                # Config Folder
    ├── controllers           # Controllers Folder For Api's
    ├── helpers               # validation and formulas
    ├── routes                # Routers in application
    ├── test                  # Test Cases
    ├── app.js                # Main server file initiating hapi server
    └── package.json          # Node dependencies



### Test API
- URL `http://localhost:4000/payslip`

- Request Type POST
    Can you any Api Handerler Like Postman

- sample payload `{

            "firstName": "Darshana",

            "lastName": "Perera",

            "annualSalary": 80000,

            "superRate": 8,

            "startDate": "01 May – 31 May"
        
        }
        `
## API Test Cases
indside `cd kinesso-back-end`

then `npm run test`