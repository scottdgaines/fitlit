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
let infoContainerHeader = document.getElementById('infoContainerHeader')
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

function resetChart() {
  myChart.destroy();
};

function renderDailyData(dataType, user) {

  if (dataType === 'water') {
    hide(welcomeMessage);
    unhide(userDataContainer);
    unhide(myAverageInfo);
    unhide(myWeekInfo);
    dayInfoText.innerText = `You have consumed ${user.returnUserOuncesByDay(allHydrationData, user.findMostRecentDate(allHydrationData))} ounces of water!`
    averageInfoText.innerText = ` ${user.returnAllTimeHydration(allHydrationData)} fluid ounces per day!`
    weekInfoText.innerText = `Here is the water you consumed in the last week: `
    weeklyDataMessage(allHydrationData, 'numOunces', user)
  } else if (dataType === 'sleep'){
    hide(welcomeMessage);
    unhide(userDataContainer);
    unhide(myAverageInfo);
    unhide(myWeekInfo);
    dayInfoText.innerText = `Today, you slept ${user.returnSleepHoursByDay(allSleepData, user.findMostRecentDate(allSleepData))} hours and your quality of sleep was ${user.returnSleepQualityByDay(allSleepData, user.findMostRecentDate(allSleepData))} / 5!`
    // averageInfoText.innerText = ` ${user.returnOverallAverageHours(allSleepData)} hours of sleep per night and your average sleep quality is ${user.returnOverallAverageQuality(allSleepData)} / 5! `
    weekInfoText.innerText = `Here are the hours and quality of sleep you achieved in the last week: `
    weeklyDataMessage(allSleepData, 'hoursSlept', user)
    // weekInfoText.innerText += `Here is how well you slept in the last week: ` REMOVES BANNER
    // weeklyDataMessage(allSleepData, 'sleepQuality', user) BREAKS DUAL DATA SET FUNCTIONALITY
  } else {
    hide(welcomeMessage);
    hide(myAverageInfo);
    hide(myWeekInfo);
    unhide(userDataContainer);
    dayInfoText.innerText = `Go take a walk!`
  }
}

function updateBackgroundImage(dataType) {
  // myDayInfoContainer.innerHTML = `<img class="background-image" src="./images/fitlit_${dataType}_icon.svg"
  //   alt="activity logo" />`
  // myAverageInfo.innerHTML = `<img class="background-image" src="./images/fitlit_${dataType}_icon.svg"
  // alt="activity logo" />`
}

function weeklyDataMessage(array, neededData, user) {
  if (neededData === 'hoursSlept') {
    //also run sleepQuality
    let userWeekData = user.returnUserWeekData(array, neededData);
    let otherWeekData = user.returnUserWeekData(array, 'sleepQuality');
    let data = [[],[]];

    // userWeekData.forEach(dataPoint =>
    //   weekInfoText.innerText += ` ${dataPoint}, `) REMOVES SLEEP DATA BANNER
      let dates = userWeekData.map(date => {
      let splits = date.split(": ");
      data[0].push(splits[1]);
      return splits[0];
      });
    // );

    otherWeekData.forEach(dataPoint => {
      // weekInfoText.innerText += ` ${dataPoint}, ` REMOVES SLEEP DATA BANNER
      let newSplits = dataPoint.split(": ");
      data[1].push(newSplits[1]);
      });

    renderSleepChart(data, dates)

  } else {
  const userWeekData = user.returnUserWeekData(array, neededData)
  // userWeekData.forEach(dataPoint =>
  //   weekInfoText.innerText += ` ${dataPoint}, `) REMOVES HYDRATION DATA BANNER
    const data = [ ];
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

  if(myChart) {
    resetChart(myChart)
  };

  const dataSet1 = data[0];
  const dataSet2 = data[1];

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: dates,
          datasets: [{
              label: 'Hours slept',
              data: dataSet1,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          },
          {
              label: 'Sleep quality',
              data: dataSet2,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
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
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
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
