# E/PRO

E/Pro is a training and nutrition mobile app that analyzes a woman’s unique cycle and birth control method. With this information, users can also schedule and track their own daily exercises.

The app breaks down the average woman’s cycle into four distinct phases based on fluctuating estrogen and progesterone levels which have direct implications on athletic performance. These phases are Performance, Strength, Endurance, and Rest.

With this information users can better understand their own physiology and use the app to tailor workout plans based on where they are in their cycle.

## Getting Started
Prerequisites: NodeJS and Xcode

First, navigate to the preferred local directory.

Next, access the demo site by cloning the Github repository:
```
$ git clone https://github.com/smarvez/EPRO.git
```

Navigate inside the directory './EPRO/epro' and run the following commands:

```
$ npm install
$ react-native run-ios
```
Your simulator should automatically open the application.

## Sample User Login

### Logging In
* In the landing page, either sign up as a user or use the following credentials as a test user:
```
username: user1@test.com
password: user1
```
### Home Page
* Once logged in, the user lands on their Home Page, where their current stats and upcoming workout schedule are displayed.

* The graph indicates exercise volume by day and the user can choose to press on “Go to today’s workout” to see what they have scheduled for today.

### Profile Page
* In the User Profile Page, the user can view their cycle overview based on the information they provided during the registration process.

* Represented in the graph are the two main hormones we’re concerned about in regards to athletic performance: Estrogen on left and Progesterone on right.

* Research shows that due to monthly fluctuations in these hormones, women should expect to have four distinct phases in terms of training - and those are Power, Performance, Endurance, and Rest.

* The user can press on "Learn More" to read about their current phase and how this should impact their fitness and nutrition plan.

### Workout Page
* When creating workouts the user can then take the information from their profile page to tailor exercises based on the phase they're in.

* As soon as the user navigates to the workouts page they automatically lands on today's workout schedule.

* To add a workout, users can press on the plus button and fill in the necessary information.

### Navigation
* On the top left navigation icon, users can read more about E/Pro as an application or Log Out.

## Build With
* React Native
* Native Base
* D3.js
* Node.js
* Bcrypt
* Knex.js
* Express
* PostgreSQL

## Authors:
Melissa Utomo
* [Github Profile](https://github.com/mafutomo)
* [Professional Portfolio](http://melissautomo.com/)
Stephanie Marvez
* [Github Profile](https://github.com/smarvez)
* [Professional Portfolio](http://stephaniemarvez.surge.sh/)
