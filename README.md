# Car Directory

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The web app allows users to select their car from a directory of registered cars. The api within the apiserver directory provides a list of available makes, models of each make and specific cars for each model with horsepower and engine capacity info.

## Pre-requisites

Ensure you have the following set up locally:

- [Node](https://nodejs.org)
- [Git](https://www.atlassian.com/git/tutorials/install-git)

## Getting Started

These instructions will get you a copy of the project on your local machine for development and testing purposes.

### Installation

Clone the repository using any of the methods stated below.

**Via SSH**

```sh
git clone git@github.com:chiamakaikeanyi/car-directory.git
```

**Via HTTPS**

```sh
git clone https://github.com/chiamakaikeanyi/car-directory.git
```

### Switch to the directory

```sh
cd car-directory
```

### Install the dependencies

Run

```sh
yarn
```

### Starting the App

Run the command below to start the server

```sh
node apiserver/server.js
```


Open another terminal and run the command below to start the web app

```sh
yarn start
```

The browser is expected to launch the app on the browser on http://localhost:3000.



## API Endpoints

http://localhost:8080/api/makes

Fetches the available car makes to choose from.

### Params

none

### Return value

An array of strings, each representing a unique car make.

### Example request

`GET http://localhost:8080/api/makes`

### Example response

```json
[
  "Ford",
  "Opel",
  ...
]
```

## http://localhost:8080/api/models

Fetches the available car models for the specified make.

### Params

- make: string _(required)_

### Return value

An array of strings, each representing a unique model of the specified make.

### Example Request

`GET http://localhost:8080/api/models?make=Ford`

### Example response

```json
[
  "Explorer",
  "Fiesta",
  ...
]
```

## http://localhost:8080/api/vehicles

Fetches the available registered cars for the specified make and model.

### Params

- make: string _(required)_
- model: string _(required)_

### Return value

An Array of objects with the following properties:

- make: string `// the make of the car`
- model: string `// the model of the car`
- enginePowerPS: number `// engine power in Horsepower units`
- enginePowerPW: number `// engine power in KiloWatts`
- fuelType: string `// fuel type`
- bodyType: string `// body type`
- engineCapacity: number `// engine capacity in cc`

### Example Request

`GET http://localhost:8080/api/vehicles?make=Ford&model=Fiesta`

### Example response

```json
[
  {
    "make": "Ford",
    "model": "Fiesta",
    "enginePowerPS": 54,
    "enginePowerKW": 40,
    "fuelType": "Diesel",
    "bodyType": "Limousine",
    "engineCapacity": 1119
  },
  ...
]
```
