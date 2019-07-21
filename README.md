# Job Cracker App

Job Cracker is a React based app with user authentication, and it aims to help job seekers to centralize job-application related information at one single location, and ease the tracking process.

Deployed versio available at: https://job-cracker.herokuapp.com

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

# Features

This app will allow user to:
- add a job into job list or delete an existing job
- update job details or change job status
- add contact into directory
- link an existing contact to a job as referral or create a referral from the job page
- search for a job from the job list by job status or by company name
- fetch job from indeed.com with predefined criteria and add interesting job from the result to the job list
- check task list for the jobs that require follow up action

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Database Setup
- Create a database named job_app
- Run the queries from database.sql

### Install Dependencies
* npm `install` to install all the dependencies
* Create a `.env` file at the root of the project and include the following lines:
    ```
    SERVER_SESSION_SECRET=YOUR_OWN_SECRET_KEY
    key=YOUR_AWS_S3_KEY
    secret=YOUR_AWS_S3_SECRET
    bucket_name=YOUR_AWS_S3_BUCKET_NAME
    ```
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App
