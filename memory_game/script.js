const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const profile = document.getElementById("profile");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const controls_res = document.querySelector(".controls-container_res");
const game = document.getElementById("game_table");
const resButton = document.getElementById("res");
const wrapper = document.querySelector(".wrapper");
const table_lable = document.getElementById("table_lable");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let startTime;
let endTime;

//Items array
const items = [
  { name: "1", image: "/memory_game/images_game/1.png" },
  { name: "2", image: "/memory_game/images_game/2.png" },
  { name: "3", image: "/memory_game/images_game/3.png" },
  { name: "4", image: "/memory_game/images_game/4.png" },
  { name: "5", image: "/memory_game/images_game/5.png" },
  { name: "6", image: "/memory_game/images_game/6.png" },
  { name: "7", image: "/memory_game/images_game/7.png" },
  { name: "8", image: "/memory_game/images_game/8.png" },
];
game.classList.add("hide");
wrapper.classList.add("hide");
table_lable.classList.add("hide");
//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Время:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Ходов:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Победа!</h2>
            <h4>Ходов: ${movesCount}</h4>`;
            endTime = new Date();
              let timeDiff = endTime - startTime; // разница в миллисекундах
              let secondsPassed = Math.floor(timeDiff / 1000); // преобразование в секунды
              let minutesPassed = Math.floor(secondsPassed / 60); // преобразование в минуты
              secondsPassed = secondsPassed % 60; // оставшиеся секунды
          
              // вывод времени на экран
              result.innerHTML += `<h4>Время: ${minutesPassed} минут ${secondsPassed} секунд</h4>`;

              var movesElement = document.querySelector('input[name="moves"]');
              movesElement.value = movesCount;
              var timeElement = document.querySelector('input[name="time_win"]');
              if(minutesPassed < 10 && secondsPassed < 10){
                timeElement.value ='0'+ minutesPassed + ':' + '0' +secondsPassed;
              }else if(minutesPassed < 10){
                timeElement.value ='0'+ minutesPassed + ':' +secondsPassed;
              }
              stopGames();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  startTime = new Date();
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  wrapper.classList.remove("hide");
  controls_res.classList.add("hide");
  controls.classList.add("hide");
  stopButton.classList.add("hide");
  profile.classList.remove("hide");
  startButton.classList.add("hide");
  game.classList.remove("hide");
  resButton.classList.add("hide");
  table_lable.classList.remove("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Ходов:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    // controls_res.classList.remove("hide");
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    // resButton.classList.remove("hide");
    startButton.classList.remove("hide");
    profile.classList.remove("hide");
    game.classList.add("hide");
    wrapper.classList.add("hide");
    table_lable.classList.add("hide");
    clearInterval(interval);
  })
);

function stopGames(){
  controls_res.classList.remove("hide");
  //controls.classList.remove("hide");
  stopButton.classList.add("hide");
  resButton.classList.remove("hide");
  profile.classList.remove("hide");
  game.classList.add("hide");
  wrapper.classList.add("hide");
  table_lable.classList.add("hide");
  clearInterval(interval);
};

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

// function updateDatabase(button) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'insert_game.php', true);
//   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//       }
//   };
//   var params = "button" + button + "_click=1"; 
//   xhr.send(params);
// }
