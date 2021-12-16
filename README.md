# Interview Scheduler

## Table of Contents

* [About](#about)
* [Main features](#main-features)
* [Testing](#testing)
* [Final product](#final-product)
* [Getting started](#getting-started)
* [API](#api)
* [Deployed application](#deployed-app)
* [Dependencies](#dependencies)
* [Development dependencies](#dev-dependencies)

## About

The **Interview Scheduler** is a single page React application that allows users to book an appointment with an interviewer. The data is persisted using a  PostgreSQL database. Real time connection is established using a WebSocket connection. 

## Main features

The following features are currently implemented.

* Interviews can be booked between Monday and Friday.
* A user can switch between weekdays.
* A user can book an interview in an empty appointment slot.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* A user can cancel an existing interview.
* A user can edit the details of an existing interview.
* The list of days informs the user how many slots are available for each day.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A user is presented with a confirmation when they attempt to cancel an interview.
* A user is shown an error if an interview cannot be saved or deleted.
* A user is shown a status indicator while asynchronous operations are in progress.
When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
* The application makes API requests to load and persist data. We do not lose data after a browser refresh.

Additionally, real-time communication is established through a [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) connection

* When a user books or cancels an interview, all connected users see the update in their browser.

## Testing

A [TDD](https://en.wikipedia.org/wiki/Test-driven_development) approach was taken in the development of this project. 

The following tests were used:

* unit tests (Storybook, Jest, Testing Library)
* integration tests (Jest & Testing Library)
* end to end testing (Cypress)

## Final product
**Booking a new appointment and deleting**
![Booking a new appointment and deleting](https://github.com/navara99/scheduler/blob/master/docs/booking-appointments.gif)
**Live updates**
![Live updates](https://github.com/navara99/scheduler/blob/master/docs/real-time.gif)

## Getting started

1.  Clone the repository

```git clone git@github.com:navara99/scheduler.git```

2.  Install all dependencies

````npm install````

3.  Set up the development environment in the root of this repository with the file name **.env.development**

```
REACT_APP_WEBSOCKET_URL=ws://localhost:8001
PORT=8000
CHOKIDAR_USEPOLLING=false
```

4. Follow the instructions to set up the PostgreSQL database from the [scheduler-api documention](https://github.com/navara99/scheduler-api).

5. Start the Webpack development server from this repository

```npm start```

6.  Visit http://localhost:8000/

## API

The Scheduler API is deployed on **Heroku**. 

Currently, 3 endpoints exist. They are to retrieve the days, appointments, and interviewers.

Please wait a moment for the API to start up and provide the booked interviews.

* [https://scheduler-api-2021.herokuapp.com/api/days](https://scheduler-api-2021.herokuapp.com/api/days)

* [https://scheduler-api-2021.herokuapp.com/api/appointments](https://scheduler-api-2021.herokuapp.com/api/appointments)

* [https://scheduler-api-2021.herokuapp.com/api/interviewers](https://scheduler-api-2021.herokuapp.com/api/interviewers)

## Deployed App

The full application is deployed on **Netlify**.

The deployed application can be viewed at : [https://scheduler-thar.netlify.app/](https://scheduler-thar.netlify.app/)

Please wait a moment for the API to start up and provide the booked interviews.

## Dependencies

* React
* classnames
* normalize
* axios

## DEV Dependencies

* Babel
* Storybook
* Testing Library
* node-sass
* prop-types
* react-test-renderer

