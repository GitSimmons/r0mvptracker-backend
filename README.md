# R0mvptracker Backend
In Ragnarok Online, when bosses are defeated, they return to the world after a certain length of time. By scraping a page listing the most recent boss kills, this project sets up the backend for r0mvptracker that allows players to accurately track when each boss will become available. (note: this is for the private server: Ragna0)

In tech terms, it's a webscraper using Puppeteer on Google Cloud to populate a FireStore DB.

## Google Cloud Requirements

* FireStore for the DB. Actually, two Firestore projects, as a second one is used for Jest tests.
* Functions for Firestore: Unless you plan to run the scraper locally on your machine, you'll need to enable Functions for your project.
* Cloud Scheduler. A Blaze subscription with Google Cloud is required to run scheduled jobs. The functions averages 2500ms on 512mb, so if it isn't run frequently, it should be reasonable to expect it to remain in the free tier of CPU usage. 

### A quick note on the FireStore
Currently the function updates 2 collections, 'mvps' which contains the latest mvp kills, and 'misc' which currently has just one doc 'lastUpdated' that gives quick access to the last error-free run of the function.

## Setup for Google Cloud Functions
1. Install the dependencies with `$ npm install`
2. Setup a new firebase account with Google
3. Install firebase CLI `$ npm install -g firebase-tools`
4. Log into firebase `$ firebase login`
5. Run `$ firebase init functions` and connect to your project. Select typescript when it asks. Notably this should create a `.firebaserc` and a `firebase.json`, which are used to specify project details.
  * Double check it doesn't overwrite `package.json` or `index.ts`. In `package.json`, there's an important key `"engines": {"node": "10"}`, that will cause the  function to fail if it's reset to the default "8".
6. To build: use `$ npm run build"`
7. To deploy: use `$ firebase deploy --only functions` or `$ npm run deploy`

## Testing
### Testing setup
0. (optional: setup a second Firestore project as a dev environment)
1. Install jest `$ npm install -g jest`
2. Install ts-jest `$ npm install -g ts-jest`
3. Edit to match your config in `/functions/__tests__/index.test.ts`
4. Add your (dev) Firestore Project's json key file to the `__tests__` directory.
5. Ensure that you are following one of the codepaths for local Chromium, you can look at how it works in
`functions/src/scrapeLatestKills.ts` : 
  * On Android with Manjaro installed in Termux, I run:  
  `$ chromium-browser --headless --remote-debugging-port=9222 --no-sand-box`
  where `headless` means to not open a visible browser, `remote-debugging-port` is the port Puppeteer connects to, and `no-sandbox` is required for my environment. Of the three, only `remote-debugging-port` is required.
5.  Navigate to `/functions/` and run `$ jest` (on my phone, this takes about 10s)

## Points of Interest

## index
`functions/src/index.ts`
Here you'll find everything having to do with the Google Cloud function itself, as well as the logic for updating the FireStore db. You may see warnings come from this file before you deploy because no Firestore is specified within the file - that info gets added on Google Cloud Functions.

### scrapeLatestKills()
`src/scrapeLatestKills.ts`
This is the the Puppeteer scraper itself. It's setup to try and run Puppeteer first by connecting to an already open Chromium instance with remote-debugging-port, then to try launching from `usr/bin/chromium-browser`, and finally to run the bundled browser when on the Cloud. If you're on Windows, you'll likely want to edit the executablePath to something more suitable. If running locally, simply run this function. Returns a filtered array of latest kills.
```
[
  {
    name: ${name}
    lastKilled: ${lastKilled},
    whoKilled:} ${whoKilled}
  },
]
```

### getDataFromRows()
`./src/getDataFromRows.ts`
This function runs inside the chromium instance. Be aware that, as a result, it must remain self-contained. 

