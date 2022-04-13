# Image Ranker (CSCE Capstone)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running locally

You need to run both the UI and the API. 

### Requirements

node: `>= v14` (I think??)

### Running the UI
First, run `npm ci` to install the required node modules.

Then, run `npm run start`. This should start a local dev server at localhost:3000 by default and serve the React app.

### Running the API

** **Make sure you are in the ImageRankerServer repository. Not this repo** **

First, run `npm ci` to install the required node modules.

Then, run `npm run dev` and this should run the  express app. By default this is set to localhost:5000. 

Make sure that the hostname:port matches the same in ImageRankerClient under `src/shared/constants.js`. (These are hard coded for now)