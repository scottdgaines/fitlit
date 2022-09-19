//IMPORTS:
import UserRepository from './UserRepository';
import User from './User';
import { fetchData, fetchPost } from './apiCalls.js';
import Chart from 'chart.js/auto';
import './css/styles.css';
import './images/turing-logo.png';
import './images/fitlit_sleep_icon.svg';
import './images/fitlit_water_icon.svg';
import './images/fitlit_step_icon.svg';
import './images/sample_avatar.svg';
import './images/friendIcon.svg';
import './images/logo.svg';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';

//GLOBAL VARIABLES:
let userRepository;
let currentUser;
let allUserData;
let allSleepData;
let allHydrationData;
let allActivityData;
let allDataPoints = [allUserData, allSleepData, allHydrationData];
let myChart;

//FETCH PROMISE:
function startData() {
    Promise.all([fetchData('users', 'userData'), fetchData('sleep', 'sleepData'), fetchData('hydration', 'hydrationData'), fetchData('activity', 'activityData')])
      .then((dataSet) => {
        allUserData = new UserRepository(dataSet[0]);
        allSleepData = dataSet[1];
        allHydrationData = dataSet[2];
        allActivityData = dataSet[3];
        generatePageLoad(allUserData);
  })
};

function updateData() {
  Promise.all([fetchData('sleep', 'sleepData'), fetchData('hydration', 'hydrationData'), fetchData('activity', 'activityData')])
    .then((dataSet) => {
      // allUserData = new UserRepository(dataSet[0]);
      allSleepData = dataSet[0];
      allHydrationData = dataSet[1];
      allActivityData = dataSet[2];
  })
};


//QUERY SELECTORS:
let waterIcon = document.getElementById('water-icon');
let sleepIcon = document.getElementById('sleep-icon');
let activityIcon = document.getElementById('activity-icon');
let formIcon = document.getElementById('form-icon');
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
let navIcons = [waterIcon, sleepIcon, activityIcon, formIcon];
let logoContainer = document.getElementById('logoContainer');
let categoryForm = document.getElementById('categoryForm');
let formDisplay = document.getElementById('formDisplay');
let hydrationForm = document.getElementById('hydrationForm');
let sleepForm = document.getElementById('sleepForm');
let activityForm = document.getElementById('activityForm');
let forms = [hydrationForm, sleepForm, activityForm];
let hydrationRadio = document.getElementById('hydrationRadio');
let sleepRadio = document.getElementById('sleepRadio');
let activityRadio = document.getElementById('activityRadio');
let radioButtons = [hydrationRadio, sleepRadio, activityRadio];
let hydrationSubmitButton = document.getElementById('hydrationSubmitButton');
let sleepSubmitButton = document.getElementById('sleepSubmitButton');
let activitySubmitButton = document.getElementById('activitySubmitButton');
let submitButtons = [hydrationSubmitButton, sleepSubmitButton, activitySubmitButton];
let numOuncesInput = document.getElementById('numOunces');
let hoursSleptInput = document.getElementById('hoursSlept');
let sleepQualityInput = document.getElementById('sleepQuality');
let flightsOfStairsInput = document.getElementById('flightsOfStairs');
let minutesActiveInput = document.getElementById('minutesActive');
let numStepsInput = document.getElementById('numSteps');
let hydrationDateInput = document.getElementById('hydrationDate');
let sleepDateInput = document.getElementById('sleepDate');
let activityDateInput = document.getElementById('activityDate');
let confirmationMessage = document.getElementById('confirmationMessage');



//EVENT LISTENERS:
window.addEventListener('load', startData);
// logoContainer.addEventListener('click', tryPost)

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
  });
  radioButtons.forEach(button => {
    button.addEventListener('click', function() {selectForm()
    })
  });
  submitButtons.forEach(button => {
    button.addEventListener('click', function() {submitForm()
    })
  });
}

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
  welcomeUserName.classList.add('header');
};

function changeDisplay(currentUser) {
  if (event.target.id === 'water-icon') {
    renderUserData('water', currentUser);
    unhide(userDataContainer);
  } else if (event.target.id === 'sleep-icon') {
    renderUserData('sleep', currentUser);
    unhide(userDataContainer);
  } else if (event.target.id === 'activity-icon') {
    renderUserData('activity', currentUser);
    unhide(userDataContainer);
  } else if (event.target.id === 'form-icon') {
    unhide(formDisplay);
    hide(userDataContainer)
  }
  hide(welcomeMessage);
  moveWelcomeMessage();
};

function selectForm() {
  if (event.target.id === "hydrationRadio") {
    hideAllForms();
    unhide(hydrationForm)
  } else if (event.target.id === "sleepRadio") {
    hideAllForms();
    unhide(sleepForm)
  } else if (event.target.id === "activityRadio") {
    hideAllForms();
    unhide(activityForm)
  }
}

function submitForm() {
  event.preventDefault();
  const id = currentUser.id
  if (event.target.id === "hydrationSubmitButton") {
    const newHydrationData = new Hydration({userID:id, date:`${hydrationDateInput.value}`, numOunces: parseInt(numOuncesInput.value)});
    fetchPost('hydration', newHydrationData)
      .then(data => showConfirmationMessage())
      .then(data => updateData())
  } else if (event.target.id === "sleepSubmitButton") {
      const newSleepData = new Sleep({userID:id, date:`${sleepDateInput.value}`, hoursSlept: parseInt(hoursSleptInput.value), sleepQuality: parseInt(sleepQualityInput.value)});
      console.log(newSleepData)
      fetchPost('sleep', newSleepData)
        .then(data => showConfirmationMessage())
        .then(data => updateData())
  } else if (event.target.id === "activitySubmitButton") {
      const newActivityData = new Activity({userID:id, date:`${activityDateInput.value}`, flightsOfStairs:parseInt(flightsOfStairsInput.value), minutesActive: parseInt(minutesActiveInput.value), numSteps: parseInt(numStepsInput.value)});
      fetchPost('activity', newActivityData)
        .then(data => showConfirmationMessage())
        .then(data => updateData())
  }
}

function showConfirmationMessage(){
  resetForm();
  unhide(confirmationMessage);
  setTimeout(function() {
    hide(confirmationMessage)
    hideAllForms();
  }, 2000 )
}

function resetForm() {
  forms.forEach(form => {
    form.reset()
    })

  radioButtons.forEach(button => {
    button.checked = false
    })
}

function hideAllForms() {
  forms.forEach(form => {
    form.classList.add('hide')
  })
}

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
  averageStepGoalText.innerText = dataSet.returnAverageUserData(allUserData.userData, 'dailyStepGoal');
};

function renderHydration(user) {
  dayInfoText.innerText = `You have consumed ${user.returnUserDataByDay(allHydrationData, user.findMostRecentDate(allHydrationData), 'numOunces')} ounces of water!`
  averageInfoText.innerText = ` ${user.returnOverallAverage(allHydrationData, 'numOunces')} fluid ounces per day!`
  weekInfoText.innerText = `Here is the water you consumed in the last week: `
  clearContainerBackgrounds();
  fillContainerBackgrounds('hydration-background');
  displayWeeklyData(allHydrationData, 'numOunces', user);
};

function renderSleep(user) {
  dayInfoText.innerText = `Today, you slept ${user.returnUserDataByDay(allSleepData, user.findMostRecentDate(allSleepData), 'hoursSlept')} hours and your quality of sleep was ${user.returnUserDataByDay(allSleepData, user.findMostRecentDate(allSleepData), 'sleepQuality')} / 5!`
  averageInfoText.innerText = ` ${user.returnOverallAverage(allSleepData, 'hoursSlept')} hours of sleep per night and your average sleep quality is ${user.returnOverallAverage(allSleepData, 'sleepQuality')} / 5! `
  weekInfoText.innerText = `Here are the hours and quality of sleep you achieved in the last week: `
  clearContainerBackgrounds();
  fillContainerBackgrounds('sleep-background');
  displayWeeklyData(allSleepData, 'hoursSlept', user)
};

function renderActivity(user) {
  dayInfoText.innerText = `Your most recent stats:\n
    ${user.returnUserDataByDay(allActivityData, user.findMostRecentDate(allActivityData), 'numSteps')} steps \n
    ${user.returnMilesWalked(allActivityData, user.findMostRecentDate(allActivityData))} miles walked\n
    ${user.returnUserDataByDay(allActivityData, user.findMostRecentDate(allActivityData), 'flightsOfStairs')} flights of stairs climbed\n
    ${user.returnUserDataByDay(allActivityData, user.findMostRecentDate(allActivityData), 'minutesActive')} minutes active`
  clearContainerBackgrounds();
  fillContainerBackgrounds('step-background');
  displayWeeklyData(allActivityData, 'activity', user)

};

function renderAllUserActivity(user) {
  averageInfoText.innerText = `Compared to other FitLit users:\n
    ${allUserData.returnAverageUserData(allActivityData, 'numSteps')} steps \n
    ${allUserData.returnAverageMilesWalked(allActivityData, user.findMostRecentDate(allActivityData))} miles walked\n
    ${allUserData.returnAverageUserData(allActivityData, 'flightsOfStairs')} flights of stairs climbed\n
    ${allUserData.returnAverageUserData(allActivityData, 'minutesActive')} minutes active`
};

function renderUserData(dataType, user) {
  if (dataType === 'water') {
    showUserDataArea();
    renderHydration(user);
  } else if (dataType === 'sleep') {
    showUserDataArea();
    renderSleep(user);
  } else {
    showUserDataArea();
    renderActivity(user);
    renderAllUserActivity(user);
  }
};

function displayWeeklyData(array, neededData, user) {
  if (neededData === 'hoursSlept') {
    let userWeekData = user.returnUserWeekData(array, neededData);
    let sleepQualData = user.returnUserWeekData(array, 'sleepQuality');
    let data = {dates: [], sleepQuality: [], hoursSlept: [] };
    pushIntoObj(userWeekData, 'dates', 0, data);
    pushIntoObj(userWeekData, 'hoursSlept', 1, data);
    pushIntoObj(sleepQualData, 'sleepQuality', 1, data);

    renderSleepChart(data);

  } else if (neededData === 'numOunces'){
    const userWeekData = user.returnUserWeekData(array, neededData)
    const data = { dates: [], numOunces: []};
    pushIntoObj(userWeekData, 'dates', 0, data);
    pushIntoObj(userWeekData, 'numOunces', 1, data);

    renderHydrationChart(data);

  } else {
    const userWeekSteps = user.returnUserWeekData(array, 'numSteps');
    const userWeekStairs = user.returnUserWeekData(array, 'flightsOfStairs');
    const userWeekActiveMin = user.returnUserWeekData(array, 'minutesActive');
    const data = { dates: [], steps: [], stairs: [], minutes: [] };
    pushIntoObj(userWeekSteps, 'dates', 0, data);
    pushIntoObj(userWeekSteps, 'steps', 1, data);
    pushIntoObj(userWeekStairs, 'stairs', 1, data);
    pushIntoObj(userWeekActiveMin, 'minutes', 1, data);
    renderActivityChart(data);
  }
};

function pushIntoObj(array, key, index, objName) {
  objName[key] = (array.map(date => {
    return date.split(": ")[index]}));
};


//DISPLAY HELPER FUNCTIONS:
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
};

function showUserDataArea() {
  hide(welcomeMessage);
  hide(formDisplay);
  unhide(userDataContainer);
  unhide(myAverageInfo);
  unhide(myWeekInfo);
};

function hide(element) {
  element.classList.add('hide');
};

function unhide(element) {
  element.classList.remove('hide');
};

function resetChart() {
  myChart.destroy();
};

function renderSleepChart(data) {
  const chartLayout = document.getElementById('myChart');

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: data['dates'],
          datasets: [{
              label: 'Hours slept',
              data: data['hoursSlept'],
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
              data: data['sleepQuality'],
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
};

function renderHydrationChart(data) {
  const chartLayout = document.getElementById('myChart');

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: data['dates'],
          datasets: [{
              label: 'Ounces of water consumed',
              data: data['numOunces'],
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

function renderActivityChart(data) {
  const chartLayout = document.getElementById('myChart');

  if(myChart) {
    resetChart(myChart)
  };

  myChart = new Chart(chartLayout, {
      type: 'line',
      data: {
          labels: data['dates'],
          datasets: [{
              label: 'Step count',
              data: data['steps'],
              backgroundColor: [
                  '#8892B3',
              ],
              borderColor: [
                  '#88B3B3',
              ],
              borderWidth: 1
          },
          {
              label: 'Flights of stairs climbed',
              data: data['stairs'],
              backgroundColor: [
                  '#D6C2FF'
              ],
              borderColor: [
                  '#5F6E7D'
              ],
              borderWidth: 1
          },
          {
              label: 'Minutes active',
              data: data['minutes'],
              backgroundColor: [
                  'black'
              ],
              borderColor: [
                  'black'
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
