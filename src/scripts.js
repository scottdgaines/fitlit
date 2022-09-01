// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/fitlit_step_icon.svg'
import './images/fitlit_sleep_icon.svg'
import './images/fitlit_hydration_icon.svg'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

//IMPORTS:
// import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import fetchData from './apiCalls.js';

//GLOBAL VARIABLES:
let userRepository;
let currentUser;
let allUserData;
let allSleepData;
let allHydrationData;
let allDataPoints = [allUserData, allSleepData, allHydrationData]

// FETCH PROMISE:
let dataTypes = [
  'users',
  'sleep',
  'hydration'
];

let requests = dataTypes.map(dataType => fetchData(dataType));

Promise.all(requests)
  .then(responses => responses.forEach((request, index) => {
    let name = allDataPoints[index];
    name = request;
  }
));

function startData() {
    Promise.all([fetchData('users', 'userData'), fetchData('sleep', 'sleepData'), fetchData('hydration', 'hydrationData')])
      .then((dataSet) => {
        allUserData = dataSet[0];
        allSleepData = dataSet[1];
        allHydrationData = dataSet[2];
        generatePageLoad(allUserData);

  })
};

// startData();



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

//EVENT LISTENERS:
window.addEventListener('load', startData);

navIcons.forEach(icon => {
  icon.addEventListener('click', changeDisplay)
});


//EVENT HANDLERS:
function generatePageLoad(userData) {
  currentUser = generateRandomUser(userData);
  console.log(currentUser)
  welcomeUser(currentUser)
  renderMyInfo(currentUser);
  renderMyFriends(currentUser, userData);
  // renderMyStepGoal(userData);
  // renderAvgStepGoal(userData);
};

function generateRandomUser(userData) {
  let currentUserObj = userData[Math.floor(Math.random() * userData.length)];
  return currentUser = new User(currentUserObj);
};

function welcomeUser(currentUser) {
  welcomeMessage.innerHTML = `Hi, ${currentUser.returnUserFirstName()}!`
};

function changeDisplay() {
  if (event.target.id === 'water-icon') {
    renderData(water);
  } else if (event.target.id === 'sleep-icon') {
    renderData(sleep);
  } else if (event.target.id === 'activity-icon') {
    renderData(activity);
  }
  hide(welcomeMessage);
  unhide(userDataContainer);
  unhide(logoContainer);
};

function hide(element) {
  element.classList.add('hidden');
};

function unhide(element) {
  element.classList.remove('hidden');
};

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

function renderMyFriends(currentUser, allUserData) {
  console.log(currentUser.friends)
  currentUser.friends.forEach(friendID => {
    const friendObj = allUserData.find(userObj => friendID === userObj.id)
    const friendName = friendObj.name
    myFriendBoxContainer.appendChild(makeAFriend(friendName))
  });
};

// function renderData(dataType) {
//   myDayInfoContainer.innerText = //call currentUser.whatever to get data. Need to move these methods into user I think
// //consider making more dynamic to take in both dataType AND element where it will display
// }



//click on a water/sleep/activity icon populates the larger bubbles with
//user info from user class
//average step goal for all users will populate in box, also user's step goal
