//IMPORTS:
import UserRepository from './UserRepository';
import User from './User';
import fetchData from './apiCalls.js';
import Chart from 'chart.js/auto';
import './css/styles.css';
import './images/turing-logo.png';
import './images/fitlit_sleep_icon.svg';
import './images/fitlit_water_icon.svg';
import './images/fitlit_step_icon.svg';
import './images/sample_avatar.svg';
import './images/friendIcon.svg';
import './images/logo.svg'

//GLOBAL VARIABLES:
let userRepository;
let currentUser;
let allUserData;
let allSleepData;
let allHydrationData;
let allDataPoints = [allUserData, allSleepData, allHydrationData];
let myChart;

//FETCH PROMISE:
function startData() {
    Promise.all([fetchData('users', 'userData'), fetchData('sleep', 'sleepData'), fetchData('hydration', 'hydrationData')])
      .then((dataSet) => {
        allUserData = new UserRepository(dataSet[0]);
        allSleepData = dataSet[1];
        allHydrationData = dataSet[2];
        generatePageLoad(allUserData);
  })
};

//QUERY SELECTORS:
let waterIcon = document.getElementById('water-icon');
let sleepIcon = document.getElementById('sleep-icon');
let activityIcon = document.getElementById('activity-icon');
let welcomeUserName = document.getElementById('welcomeUserName')
let welcomeMessage = document.getElementById('welcomeMessage');
let userInfoContainer = document.getElementById('myUserInfo');
let infoContainerHeader = document.getElementById('infoContainerHeader')
let userStepGoalText = document.getElementById('userStepGoalText');
let averageStepGoalContainer = document.getElementById('averageStepGoalContainer');
let averageStepGoalText = document.getElementById('avgStepGoal');
let userDataContainer = document.getElementById('userDataContainer')
let myDayInfoContainer = document.getElementById('myDayInfoContainer');
let dayInfoText = document.getElementById('dayInfoText');
let myAverageInfo = document.getElementById('myAverageInfoContainer');
let averageInfoText = document.getElementById('averageInfoText');
let myAverageInfoContainer = document.getElementById('myAverageInfoContainer');
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

function welcomeUser() {
  welcomeUserName.innerText = `Hi, ${currentUser.returnUserFirstName()}!`
};

function moveWelcomeMessage() {
  welcomeUser(currentUser);
  logoContainer.appendChild(welcomeUserName);
  welcomeUserName.classList.add('welcome-header');
};

function changeDisplay(currentUser) {
  if (event.target.id === 'water-icon') {
    renderUserData('water', currentUser);
  } else if (event.target.id === 'sleep-icon') {
    renderUserData('sleep', currentUser);
  } else if (event.target.id === 'activity-icon') {
    renderUserData('activity', currentUser);
  }
  hide(welcomeMessage);
  unhide(userDataContainer);
  unhide(logoContainer);
  moveWelcomeMessage();
};

function hide(element) {
  element.classList.add('hide');
};

function unhide(element) {
  element.classList.remove('hide');
};

function renderMyInfo(currentUser) {
  var userAvatar = document.createElement('img');
  userAvatar.classList.add('medium');
  userInfoContainer.appendChild(userAvatar);
  userInfoContainer.innerHTML = `Name: ${currentUser.name}
    <br>Address:<br> ${currentUser.address}
    <br>Email: ${currentUser.email}
    <br>Stride Length: ${currentUser.strideLength}`
};

function makeAFriend(friendName) {
  var friendDisplay = document.createElement('div');
  var friendIcon = document.createElement('img');
  var friendNameElement = document.createElement('h5');
  friendIcon.src = './images/friendIcon.svg';
  friendIcon.alt = 'blank person avatar'
  friendIcon.classList.add('small')
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

function resetChart() {
  myChart.destroy();
};

function showUserDataArea() {
  hide(welcomeMessage);
  unhide(userDataContainer);
  unhide(myAverageInfo);
  unhide(myWeekInfo);
};

function clearContainerBackgrounds() {
  const backgrounds = ['sleep-background', 'step-background', 'hydration-background'];
  backgrounds.forEach(background => {
    myDayInfoContainer.classList.remove(background);
    myAverageInfoContainer.classList.remove(background);
  })
};

function fillContainerBackgrounds(icon) {
  myDayInfoContainer.classList.add(icon);
  myAverageInfoContainer.classList.add(icon);
}

function renderHydration(user) {
  dayInfoText.innerText = `You have consumed ${user.returnUserOuncesByDay(allHydrationData, user.findMostRecentDate(allHydrationData))} ounces of water!`
  averageInfoText.innerText = ` ${user.returnAllTimeHydration(allHydrationData)} fluid ounces per day!`
  weekInfoText.innerText = `Here is the water you consumed in the last week: `
  clearContainerBackgrounds();
  fillContainerBackgrounds('hydration-background');
  weeklyDataMessage(allHydrationData, 'numOunces', user);
};

function renderSleep(user) {
  dayInfoText.innerText = `Today, you slept ${user.returnSleepHoursByDay(allSleepData, user.findMostRecentDate(allSleepData))} hours and your quality of sleep was ${user.returnSleepQualityByDay(allSleepData, user.findMostRecentDate(allSleepData))} / 5!`
  averageInfoText.innerText = ` ${user.returnOverallAverageHours(allSleepData)} hours of sleep per night and your average sleep quality is ${user.returnOverallAverageQuality(allSleepData)} / 5! `
  weekInfoText.innerText = `Here are the hours and quality of sleep you achieved in the last week: `
  clearContainerBackgrounds();
  fillContainerBackgrounds('sleep-background');
  weeklyDataMessage(allSleepData, 'hoursSlept', user)
};

function renderActivity(user) {
  dayInfoText.innerText = `Go take a walk!`
  clearContainerBackgrounds();
  fillContainerBackgrounds('step-background');
};


function renderUserData(dataType, user) {
  if (dataType === 'water') {
    showUserDataArea();
    renderHydration(user);
  } else if (dataType === 'sleep') {
    showUserDataArea();
    renderSleep(user);
  } else {
    hide(myWeekInfo); //these will go once we have the activity functions running
    hide(myAverageInfo);
    renderActivity(user);
  }
};

function splitDates() {

}

function weeklyDataMessage(array, neededData, user) {
  if (neededData === 'hoursSlept') {
    let userWeekData = user.returnUserWeekData(array, neededData);
    let sleepQualData = user.returnUserWeekData(array, 'sleepQuality');
    let data = [[],[]];
    let dates = userWeekData.map(date => {
      let splits = date.split(": ");
      data[0].push(splits[1]);
      return splits[0];
      });

    sleepQualData.forEach(sleepQualDataPoint => {
      let splitDates = sleepQualDataPoint.split(": ");
      data[1].push(splitDates[1]);
      });

    renderSleepChart(data, dates)

  } else {
    const userWeekData = user.returnUserWeekData(array, neededData)
    const data = [];
    const dates = userWeekData.map(date => {
      const splits = date.split(": ");
      data.push(splits[1]);
      return splits[0];
    });
    renderHydrationChart(data, dates);
    };
  };

function renderSleepChart(data, dates) {
  const chartLayout = document.getElementById('myChart');
  const dataSet1 = data[0];
  const dataSet2 = data[1];

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Hours slept',
              data: dataSet1,
              backgroundColor: [
                '#8892B3',
              ],
            borderColor: [
                '#88B3B3',
              ],
              borderWidth: 1
          },
          {
              label: 'Sleep quality (out of 5)',
              data: dataSet2,
              backgroundColor: [
                  '#D6C2FF'
              ],
              borderColor: [
                  '#5F6E7D'
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          interaction: {
            mode: 'index'
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false,
      }
  });
}

function renderHydrationChart(data, dates) {
  const chartLayout = document.getElementById('myChart');

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Ounces of water consumed',
              data: data,
              backgroundColor: [
                  '#8892B3',
              ],
              borderColor: [
                  '#88B3B3',
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          interaction: {
            mode: 'index'
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          maintainAspectRatio: false,
      }
  });
};
