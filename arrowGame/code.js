var keys = [false, false, false, false];
var score;
var speedMax;
var speedMin;
var downY;
var upY;
var leftY;
var rightY;
var highscore = 0;
var seconds;
var highscoreName = "No Name";
var leftSpeed;
var rightSpeed;
var downSpeed;
var upSpeed;
var submitted;
findHighScore();
displayHighScore();
updateScreen();
onEvent("startButton", "click", function( ) {
  submitted = false;
  score = 0;
  seconds = 0;
  leftSpeed = (randomNumber(1,2));
  rightSpeed = (randomNumber(1,2));
  downSpeed = (randomNumber(1,2));
  upSpeed = (randomNumber(1,2));
  speedMax = 4;
  speedMin = 2;
  hideElement("submitted");
  setProperty("score", "text", "Score: " + score);
  setProperty("label9", "text", seconds + " seconds");
  setProperty("seconds", "text", "Seconds: " + seconds);
  setScreen("screen1");
  showElement("label4");
  setProperty("label4", "text", "3");
  setProperty("label4", "text-color", "red");
  setProperty("label4", "font-size", 74);
  setPosition("label4", 120, 130);
  setTimeout(function() {
    setProperty("label4", "text", "2");
    setProperty("label4", "text-color", "yellow");
    setProperty("label4", "font-size", 75);
  }, 1000);
  setTimeout(function() {
    setProperty("label4", "text", "1");
    setProperty("label4", "text-color", "green");
    setProperty("label4", "font-size", 76);
  }, 2000);
  setTimeout(function() {
    setProperty("label4", "text", "GO!");
    setProperty("label4", "text-color", "black");
    setProperty("label4", "font-size", 78);
    setPosition("label4", 60, 130);
  }, 3000);
  setTimeout(function() {
    hideElement("label4");
  timedLoop(1000, function() {
    seconds = seconds + 1;
    });
    timedLoop(20, function() {
      upY = getYPosition("up");
      setPosition("up", 80, getYPosition("up")+upSpeed);
      rightY = getYPosition("right");
      setPosition("right", 240, getYPosition("right")+rightSpeed);
      leftY = getYPosition("left");
      setPosition("left", 0, getYPosition("left")+leftSpeed);
      downY = getYPosition("down");
      setPosition("down", 160, getYPosition("down")+downSpeed);
      updateScreen();
    });
  }, 3200);
});
onEvent("screen1", "keydown", function(event) {
  if (event.key == "Up") {
    keys[2] = true;
  } else if ((event.key == "Down")) {
    keys[3] = true;
  } else if ((event.key == "Left")) {
    keys[0] = true;
  } else if ((event.key == "Right")) {
    keys[1] = true;
  } else if ((event.key == "w")) {
    keys[2] = true;
  } else if ((event.key == "s")) {
    keys[3] = true;
  } else if ((event.key == "a")) {
    keys[0] = true;
  } else if ((event.key == "d")) {
    keys[1] = true;
  }
  if (keys[3] == true && (downY >= 180 && downY <= 265)) {
    setPosition("down", 160, -35);
    score = score + 10;
    downSpeed = randomNumber(speedMin, speedMax);
  } else if (keys[3] == true && (downY >= 212 || downY <= 290)) {
    score = score - 5;
  } else if (keys[2] == true && (upY >= 180 && upY <= 265)) {
    setPosition("up", 80, -35);
    score = score + 10;
    upSpeed = randomNumber(speedMin, speedMax);
  } else if (keys[2] == true && (upY >= 212 || upY <= 290)) {
    score = score - 5;
  } else if (keys[0] == true && (leftY >= 180 && leftY <= 265)) {
    setPosition("left", 0, -35);
    score = score + 10;
    leftSpeed = randomNumber(speedMin, speedMax);
  } else if (keys[0] == true && (leftY >= 212 || leftY <= 290)) {
    score = score - 5;
  } else if (keys[1] == true && (rightY >= 180 && rightY <= 265)) {
    setPosition("right", 240, -35);
    score = score + 10;
    rightSpeed = randomNumber(speedMin, speedMax);
  } else if (keys[1] == true && (rightY >= 212 || rightY <= 290)) {
    score = score - 5;
}
});
onEvent("screen1", "keyup", function(event) {
  if (event.key == "Up") {
    keys[2] = false;
  } else if ((event.key == "Down")) {
    keys[3] = false;
  } else if ((event.key == "Left")) {
    keys[0] = false;
  } else if ((event.key == "Right")) {
    keys[1] = false;
  } else if ((event.key == "w")) {
    keys[2] = false;
  } else if ((event.key == "s")) {
    keys[3] = false;
  } else if ((event.key == "a")) {
    keys[0] = false;
  } else if ((event.key == "d")) {
    keys[1] = false;
  }
});
onEvent("retryButton", "click", function( ) {
  stopSound();
  setScreen("startScreen");
  setPosition("right", 240, -25);
  setPosition("left", 0, -25);
  setPosition("up", 80, -25);
  setPosition("down", 160, -25);
  setProperty("score", "text", "Score: " + score);
  setProperty("label9", "text", seconds + " seconds");
  setProperty("seconds", "text", "Seconds: " + seconds);
  hideElement("submitted");
});
onEvent("sumbitButton", "click", function( ) {
  if (submitted == false) {
    stopSound();
    showElement("submitted");
    setProperty("submitted", "text-color", rgb(13, 193, 28));
    setProperty("submitted", "text", "Submitted!");
    setTimeout(function() {
      hideElement("submitted");
    }, 500);
    findHighScore();
displayHighScore();
    highscoreTable();
  } else {
    showElement("submitted");
    setProperty("submitted", "text-color", "red");
    setProperty("submitted", "text", "Already Submitted");
    setTimeout(function() {
      hideElement("submitted");
    }, 1000);
  }
});
function updateScreen() {
  if (downY == 499 || downY >= 500 ) {
    setPosition("down", 160, -35);
    score = score - 20;
  } else if (upY == 499 || upY >= 500) {
    setPosition("up", 80, -35);
    score = score - 20;
  } else if (rightY == 499 || rightY >= 500) {
    setPosition("right", 240, -35);
    score = score - 20;
  } else if (leftY == 499 || leftY >= 500) {
    setPosition("left", 0, -35);
    score = score - 20;
  } else if (score < 0) {
    setScreen("youLose");
    stopTimedLoop();
    stopSound();
  }
  if (seconds >= 150) {
    speedMax = speedMax + 0.002;
    speedMin = speedMin + 0.0025;
  }  else if (seconds >= 120 && seconds <= 123) {
    speedMax = speedMax + 0.004;
    speedMin = speedMin + 0.0001;
  }  else if (seconds >= 90 && seconds <= 94) {
    speedMax = speedMax + 0.005;
    speedMin = speedMin + 0.0005;
  } else if ((seconds >= 40 && seconds <= 41)) {
    speedMax = speedMax + 0.003;
    speedMin = speedMin + 0.02;
  } else if ((seconds >= 0)) {
    speedMax = speedMax + 0.0005;
  }
  setProperty("score", "text", "Score: " + score);
  setProperty("label9", "text", seconds + " seconds");
  setProperty("seconds", "text", "Seconds: " + seconds);
}
function displayHighScore() {
  setText("nameOfUser", "Name: " + highscoreName);
  setText("highScoreMainMenu", "Seconds: " + highscore);
}
function findHighScore() {
  readRecords("highscoreTable", {}, function(records) {
    for (var i = 0; i < records.length; i++) {
      if((records[i]).secondsPlayed > highscore) {
        highscore = records[i].secondsPlayed;
        highscoreName = records[i].nameOfUser;
      }
    }
  displayHighScore();
  });
}
function highscoreTable() {
  var currentName = getText("fistInitial") + getText("middleInitial") + getText("lastInitial");
  var currentTime = seconds;
  createRecord("highscoreTable", {nameOfUser:currentName, secondsPlayed:currentTime}, function() {
    if(currentTime > highscore) {
      highscore = currentTime;
      highscoreName = currentName;
      displayHighScore();
      stopSound();
      setProperty("sumbitted", "texts", "CONGRATS!");
    }
  });
  submitted = true;
}
onEvent("moreHighScores", "click", function( ) {
  setScreen("highScores");
});
