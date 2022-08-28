// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

//IMPORTS:
import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';

//GLOBAL VARIABLES:
let userRepository = new UserRepository(userData);
let currentUser

//QUERY SELECTORS:
let waterIcon
let sleepIcon
let activityIcon
let welcomeMessage
let friendBox
let userInfoBox
let userStepGoal
let averageStepGoal
let mainDisplay
let myDayInfo
let myAverageInfo
let myWeekInfo

//EVENT LISTENERS:
//loop to add EL to each nav bar icon
//pageload fires generateRandomUser

//EVENT HANDLERS:
function generateRandomUser(userData) {
  let currentUserObj = userData[Math.floor(Math.random() * userData.length)];
  currentUser = new User(currentUserObj);
};

function welcomeUser() {
  welcomeMessage.innerHTML = ``
}


//On load, generate random user from data set
//on load, we see a transparent version of logo and welcome message that will be hidden
//when user clicks an icon in navBar
//my info box will populate
// welcome message will populate (running user.return user first name);
//my friends will populate (from user.friends array)

//event listeners on navbar icons
//all clicks hide big welcome message, unhide welcome message at top
//click on a water/sleep/activity icon populates the larger bubbles with
//user info from user class
//average step goal for all users will populate in box, also user's step goal
