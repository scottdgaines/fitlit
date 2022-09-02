// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/fitlit_sleep_icon.svg';
import './images/fitlit_water_icon.svg';
import './images/fitlit_step_icon.svg';
import './images/sample_avatar.svg';
import './images/friendIcon.svg';



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
function startData() {
    Promise.all([fetchData('users', 'userData'), fetchData('sleep', 'sleepData'), fetchData('hydration', 'hydrationData')])
      .then((dataSet) => {
        allUserData = new UserRepository(dataSet[0]);
        allSleepData = dataSet[1];
        allHydrationData = dataSet[2];
        generatePageLoad(allUserData); //since generatePageLoad happens after promise is resolved, how come I can't access currentUser globally later?

  })
};


//QUERY SELECTORS:
let waterIcon = document.getElementById('water-icon');
let sleepIcon = document.getElementById('sleep-icon');
let activityIcon = document.getElementById('activity-icon');
let welcomeUserName = document.getElementById('welcomeUserName')
let welcomeMessage = document.getElementById('welcomeMessage');
let friendContainer = document.getElementById('myFriendBoxContainer');
let userInfoContainer = document.getElementById('myUserInfo');
let userInfotext;
let userStepGoalContainer = document.getElementById('userStepsContainer');
let userStepGoalText = document.getElementById('userStepGoalText');
let averageStepGoalContainer = document.getElementById('averageStepGoalContainer');
let averageStepGoalText = document.getElementById('avgStepGoal');
let mainDisplay = document.getElementById('userDataContainer');
let userDataContainer = document.getElementById('userDataContainer')
let myDayInfoContainer = document.getElementById('myDayInfoContainer');
let dayInfoText = document.getElementById('dayInfoText');
let myAverageInfo = document.getElementById('myAverageInfoContainer');
let averageInfoText = document.getElementById('averageInfoText');
let weekInfoText = document.getElementById('weekInfoText');
let myWeekInfo = document.getElementById('myWeekInfoContainer');
let navIcons = [waterIcon, sleepIcon, activityIcon];
let logoContainer = document.getElementById('logoContainer');

//EVENT LISTENERS:
window.addEventListener('load', startData);


//EVENT HANDLERS:
function generatePageLoad(userData) {
  currentUser = generateRandomUser(userData.userData);
  welcomeUser(currentUser)
  renderMyInfo(currentUser);
  renderMyFriends(currentUser, userData.userData);
  renderMyStepGoal(currentUser);
  renderAvgStepGoal(userData);
  navIcons.forEach(icon => {
    icon.addEventListener('click', function() {changeDisplay(currentUser)
    })
  })
};

function generateRandomUser(userData) {
  let currentUserObj = userData[Math.floor(Math.random() * userData.length)];
  return currentUser = new User(currentUserObj);
};

function welcomeUser(currentUser) {
  welcomeUserName.innerText = `Hi, ${currentUser.returnUserFirstName()}!`
};

function changeDisplay(currentUser) {
  if (event.target.id === 'water-icon') {
    renderDailyData('water', currentUser);
  } else if (event.target.id === 'sleep-icon') {
    renderDailyData('sleep', currentUser);
  } else if (event.target.id === 'activity-icon') {
    renderDailyData('activity', currentUser);
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
  friendIcon.classList.add('icon');
  friendDisplay.appendChild(friendIcon);
  friendDisplay.appendChild(friendNameElement);
  friendNameElement.innerText = friendName;
  return friendDisplay;
};

function renderMyFriends(currentUser, allUserData) {
  currentUser.friends.forEach(friendID => {
    const friendObj = allUserData.find(userObj => friendID === userObj.id)
    const friendName = friendObj.name
    myFriendBoxContainer.appendChild(makeAFriend(friendName))
  });
};

function renderMyStepGoal(user) {
  userStepGoalText.innerText = user.dailyStepGoal;
};

function renderAvgStepGoal(dataSet) {
  averageStepGoalText.innerText = dataSet.returnAverageUserData('steps');
};

function renderDailyData(dataType, user) {
  if (dataType === 'water') {
    showDataContainer();
    dayInfoText.innerText = `consumed ${user.returnUserOuncesByDay(allHydrationData, user.findMostRecentDate(allHydrationData))} ounces of water!`
    averageInfoText.innerText = ` ${user.returnAllTimeHydration(allHydrationData)} fluid ounces per day!`
    weekInfoText.innerText = `Your weekly amount of water consumed is `
    weeklyDataMessage(allHydrationData, 'numOunces', user)
  } else if (dataType === 'sleep'){
    showDataContainer()
    dayInfoText.innerText = `slept ${user.returnSleepHoursByDay(allSleepData, user.findMostRecentDate(allSleepData))} of hours and your quality of sleep was a ${user.returnSleepQualityByDay(allSleepData, user.findMostRecentDate(allSleepData))} out of 5!`
    averageInfoText.innerText = ` ${user.returnOverallAverageHours(allSleepData)} hours of sleep per night and your average sleep quality is ${user.returnOverallAverageQuality(allSleepData)} out of 5! `
    weekInfoText.innerText = `Here are the hours of sleep you achieved in the last week: `
    weeklyDataMessage(allSleepData, 'hoursSlept', user)
    weekInfoText.innerText += `Here is how well you slept in the last week: `
    weeklyDataMessage(allSleepData, 'sleepQuality', user)
  } else {
    showDataContainer()
    myDayInfoContainer.innerText = `Go take a walk!`
  }
}

function hideDataConatainer() {
  userDataContainer.classList.add('hide')
}

function showDataContainer() {
  userDataContainer.classList.remove('hide')
}

function weeklyDataMessage(array, neededData, user){
user.returnUserWeekData(array, neededData).forEach(array =>
  weekInfoText.innerText += ` ${array}, `)
}


//click on a water/sleep/activity icon populates the larger bubbles with
//user info from user class
//average step goal for all users will populate in box, also user's step goal
