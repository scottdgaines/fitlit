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
let waterIcon = document.getElementById('water-icon');
let sleepIcon = document.getElementById('sleep-icon');
let activityIcon = document.getElementById('activity-icon');
let welcomeMessage = document.getElementById('welcomeMessage');
let friendContainer = document.getElementById('myFriendBoxContainer');
let userInfoContainer = document.getElementById('myUserInfo');
let userInfotext
let userStepGoalContainer = document.getElementById('userStepsContainer');
let averageStepGoalContainer = document.getElementById('averageStepGoalContainer');
let mainDisplay = document.getElementById('userDataContainer');
let myDayInfoContainer = document.getElementById('myDayInfoContainer');
let myAverageInfo = document.getElementById('myAverageInfoContainer');
let myWeekInfo = document.getElementById('myWeekInfoContainer');
let navIcons = [waterIcon, sleepIcon, activityIcon];
let logoContainer = document.getElementById('logoContainer');

//need one for welcome header

//EVENT LISTENERS:
window.addEventListener('load', generatePageLoad);

navIcons.forEach(icon => {
  icon.addEventListener('click', changeDisplay)
});


//EVENT HANDLERS:
function generatePageLoad() {
  generateRandomUser(userData); //will that work? don't we need to declare userData as a variable?
  renderMyInfo();
  renderMyFriends();
  renderMyStepGoal();
  renderAvgStepGoal();
};

function generateRandomUser(userData) {
  let currentUserObj = userData[Math.floor(Math.random() * userData.length)];
  currentUser = new User(currentUserObj);
};

function welcomeUser() {
  welcomeMessage.innerHTML = `Hi, ${currentUser.returnUserFirstName}!`
};

function changeDisplay() {
  hide();
  unhide(mainDisplay);
  unhide();
}; //will need to hide lg box with welcome msg, unhide mainDisplay, unhide welcome header

function hide(element) {
  element.classList.add('hidden');
};

function unhide(element {
  element.classList.remove('hidden');
});

function renderMyInfo(currentUser) {
  var userAvatar = document.createElement('img');
  userAvatar.classList.add('medium');
  userInfoContainer.appendChild(userAvatar);
  userInfoContainer.innerHTML = `Name: ${currentUser.name}
    Address: ${currentUser.address}
    Email: ${currentUser.email}
    Stride Length: ${currentUser.strideLength}`
};

function makeAFriend(friendName) {
  var friendDisplay = document.createElement('div');
  var friendIcon = document.createElement('img');
  var friendNameElement = document.createElement('h6');
  friendIcon.src = './images/friendIcon.svg';
  friendIcon.classList.add('small');
  friendDisplay.appendChild(friendIcon);
  friendDisplay.appendChild(friendNameElement);
  friendNameElement.innerText = friendName;
  return friendDisplay;
};

function renderMyFriends(currentUser) {
  currentUser.friends.forEach(friendID => {
    const friendObj = userData.find(userObj => friendID === userObj.id)
    const friendName = friendObj.name
    myFriendBoxContainer.appendChild(makeAFriend(friendName))
  });
};
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
