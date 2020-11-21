# About this project

Sample project for TechLadies CI/CD with Travis & Heroku

## Presentation Link
https://docs.google.com/presentation/d/143lEMhGK92ZCnNohMO1blXDfKaJUxFQdmPHDatPugzY/edit?usp=sharing

## Pre-requisites

1. Go to Travis CI website and Sign up with GitHub.
2. Go to Heroku.com and sign up for an account.
3. Install Travis CI CLI: https://github.com/travis-ci/travis.rb#installation
4. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

Make sure you can successfully login, using the CLIs, with:

```
// for heroku
heroku login

// for travis
travis login --pro
```

----

# How to setup CI/CD with Travis & Heroku?

## Continuous Integration (CI)

## Add Travis CI/CD application to your repository
Go to https://travis-ci.com/ and login with your Github account. Add Travis to this repository. If you already have Travis installed, you can add Travis to your repository from https://github.com/settings/installations In your repository. Verify in Settings -> Integrations that Travis has been successfully added to your repository


## Create a Travis yaml file

Create a new `.travis.yml` file, with the following contents:

```yaml
language: node_js
node_js:
  - 10.13.0
install:
  - npm install
```

## Setup Travis to run tests

Modify `.travis.yaml` to the following,

```yaml
language: node_js
node_js:
  - 10.13.0
install:
  - npm install
script:
  - npm test
```

Push this to `master`. Notice the green tick next to your commits. Hover on it, to see details about the Travis build.

Add branch protection, to disable merging into `master` unless the tests pass.


Create a PR to break the test.

## Continuous Deployment (CD)

## Setup Staging

In your Heroku dashboard, create an app for staging `techladies-ci-cd-2020-staging`

Create a branch `develop`. Set this branch as the default branch.

Modify `travis.yml` as below,

```yaml
language: node_js
node_js:
  - 10.13.0
install:
  - npm install
script:
  - npm run test
branches:
  only:
    - develop
deploy:
  provider: heroku
  api_key:
    secure: ADD_API_KEY_HERE
  app:
    develop: techladies-ci-cd-2020-staging
```

To get your encrypted API key, run this command from the terminal:

`travis encrypt $(heroku auth:token) –add deploy.api_key –-pro`

Debug:
If the build fails, using the above key with an "Invalid Credentials" error, replace `$(heroku auth:token)` with the your actual Heroku API key from the Heroku Settings Page


## Setup Production

Add the production app and trigger for master branch, to `travis.yaml` ,

Modify `travis.yml` as below,

```yaml
language: node_js
node_js:
  - 10.13.0
install:
  - npm install
script:
  - npm run test
branches:
  only:
    - develop
deploy:
  provider: heroku
  api_key:
    secure: ADD_API_KEY_HERE
  app:
    master: techladies-ci-cd-2020-prod
    develop: techladies-ci-cd-2020-staging
```


----

# Running locally

1. Install dependencies using `npm install`
2. Run the server `npm start`

# Running tests

Run `npm test` to run tests



----
## Sources
* https://codesource.io/ci-cd-with-github-travis-ci-and-heroku/
* https://blog.bitsrc.io/automate-your-deployment-on-heroku-eba486b95470
* https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true