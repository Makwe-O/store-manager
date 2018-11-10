# store-manager
This Store Manager Application is a web application that helps store owners manage sales and product inventory  records. This application is meant for use in a single store. 

[![Build Status](https://travis-ci.org/Makwe-O/store-manager.svg?branch=ft-get-specific-sale-record-endpoint-%23161282767)](https://travis-ci.org/Makwe-O/store-manager)
[![Coverage Status](https://coveralls.io/repos/github/Makwe-O/store-manager/badge.svg?branch=challenge-3)](https://coveralls.io/github/Makwe-O/store-manager?branch=challenge-3)

<a href="https://codeclimate.com/github/Makwe-O/store-manager/maintainability"><img src="https://api.codeclimate.com/v1/badges/6d93e8460979157b28a8/maintainability" /></a>

## App Demo
The Demo of this app is currently being at https://store-appl.herokuapp.com/api/v1
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
## Prerequisites
Users of this platform need to have the following apps installed on their machine. Links are provided to download them if they are not currently installed   
`node` [link](https://nodejs.org/en/download/)   
`npm` [link](https://www.npmjs.com/get-npm)   
`postman` [link](https://www.getpostman.com/apps)
## Installing
The following steps will get you up and running with the app on you local machine   
### Clone the repo   
`$ git clone https://github.com/Makwe-O/store-manager `  
### Change directory
`$ cd store-manager`
### Install dependencies
`$ npm install`
### Run the server at localhost:3000
`$ npm run start`
### Run build
`$ npm run build`
## Testing
The Store Manager leverages the power of `Mocha` and `Chai` to run the testing. `Mocha` being the testing suite and `Chai` which is an assertion library. To run test:   
`npm run test`
## Deployment
App is deployed at https://store-appl.herokuapp.com/api/v1/
## Usage   
### Product Endpoints accessed via _/api/v1/products_   
| Method        | Route           | Description  | Input   |   
| ------------- |:-------------:| :-----|:--------   |
| GET      | /products | Get All Products |
| GET      | /products/id      |   Get A Product |
| Post | /products      |    Create A Product |  { name, price, quantity } |   
| PUT  | /product:id  | Modify A Product  |   
| DELETE  | /product:id | Delete A Product  | 
### Sales-Record Endpoints accessed via _/api/v1/sales_   
| Method        | Route           | Description  | Input   |   
| ------------- |:-------------:| :-----|:--------   |
| GET      | /sales | Get All Sales-Record |
| GET      | /sales/id      |   Get A Sales-Record |
| Post | /sale      |    Create A Sale-Record |  { product_name, price, buyers_name, price } |   
### SignUp/SignIn Endpoints accessed via _/api/v1/auth_   
| Method        | Route           | Description  | Input   |   
| ------------- |:-------------:| :-----|:--------   |
| POST      | /auth/login | Login | { email, password }
| POST      | /auth/signup      |   Sign Up | { name, email, password }   |

### Categories Endpoints accessed via _/api/v1/categories_   
| Method        | Route           | Description  | Input   |   
| ------------- |:-------------:| :-----|:--------   |
| GET      | /categories | Get All Categories |
| GET      | /categories/id      |   Get A Categories |
| Post | /categories      |    Create A Category |  { category_name } |   
| PUT  | /categories:id  | Modify A Category  |   
| DELETE  | /categories:id | Delete A Category  |   
## Author   
Mmakwe Onyeka Blessing
 
