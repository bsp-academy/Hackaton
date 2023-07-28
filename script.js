const pageNames = [
  "#page-logo",
  "#page-name",
  "#page-name-man",
  "#page-name-woman",
  "#page-robo",
  "#page-map-1",
  "#page-map-2",
  "#page-map-3",
  "#page-map-4",
  "#page-map-5",
  "#page-quizz-1",
  "#page-quizz-2",
  "#page-answer-1-yes",
  "#page-answer-1-no",
  "#page-answer-2-yes",
  "#page-answer-2-no"
];

let SEX = '';
let NAME = '';
let ANSWERS = [];

document.querySelector('#page-logo').addEventListener('click', function () {
  showPage("#page-name")
})

document.querySelector('#page-name-image-man').addEventListener('click', function () {
  showPage("#page-name-man")
  SEX = 'man'
})
document.querySelector('#page-name-image-woman').addEventListener('click', function () {
  showPage("#page-name-woman")
  SEX = 'woman'
})

document.querySelector('#button-go-man').addEventListener('click', function () {
  NAME = document.querySelector('#item-form-name-man').value;
  showPage("#page-map-1")
  initTimer();
})
document.querySelector('#button-go-woman').addEventListener('click', function () {
  NAME = document.querySelector('#item-form-name-woman').value;
  showPage("#page-map-1")
  initTimer();
})



function initAnswers() {
  let sexArr = ["man", "woman"]

  //пробегаем по мужчинам или женщинам
  for (let k = 0; k < sexArr.length; k++) {

    // пробегаем по 5 страницам с вопросами
    for (let i = 1; i <= 5; i++) {

      // инициализируем страницы с опросами (5 штук)
      try {
        document.querySelector('#page-map-' + i).addEventListener('click', function () {
          showPage('#page-quizz-' + i)
          //if (SEX === 'man') {
          //  showPage('#page-quizz-man-' + i)
          //} else {
          //  showPage('#page-quizz-woman-' + i)
          //}
        })

        document.querySelector('#page-quizz-' + i + '-button').addEventListener('click', function () {
          showPage(`#page-map-${i + 1}`)
        })
      } catch (e) { }


      // в каждом опроса инициализируем обработку нажатий по 4 ответам
      for (let j = 1; j <= 4; j++) {
        try {
          document.querySelector(`#page-quizz-${i}-answer-${j}`).addEventListener('click', function (el) {
            /*
            // снимаем выделение со всех ответов
            for (let p = 1; p <= 4; p++) {
              document.querySelector(`#page-quizz-${sexArr[k]}-${i}-answer-${p}`).className = 'answer-notselected';
            }

            // выделяем ткущий ответ (на который нажали)
            el.target.className = 'answer-selected';
            */

            // в массив ANSWERS сохраняем правильный или неправильный ответ
            ANSWERS[i] = this.getAttribute('data')
            if (ANSWERS[i] === 'correct') {
              showPage(`#page-answer-${i}-yes`)
            } else {
              showPage(`#page-answer-${i}-no`)
            }
            console.log(ANSWERS);
          });
        } catch (e) { }
      }
    }
  }
}

initAnswers();

function showPage(pageId) {
  for (let i = 0; i < pageNames.length; i++) {
    try {
      document.querySelector(pageNames[i]).style.display = 'none';
    } catch (e) { }
  }

  console.log('show page:' + pageId)
  document.querySelector(pageId).style.display = 'block';
}



// Запуск таймера при загрузке страницы
function initTimer() {
  const timerElement = document.querySelector('.timer');

  // Ваш код для таймера, например:
  const startTime = Date.now();
  setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    console.log("!!!", elapsedTime)

    // Обновление таймера на странице
    timerElement.textContent = formatTime(elapsedTime);
  }, 1000);
};

// Функция преобразования миллисекунд в удобный формат времени (чч:мм:сс)
function formatTime(milliseconds) {
  // Преобразуем миллисекунды в секунды
  const seconds = Math.floor(milliseconds / 1000);

  // Вычисляем часы, минуты и оставшиеся секунды
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Преобразуем значения в строки и добавляем ведущий ноль при необходимости
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(remainingSeconds).padStart(2, '0');

  // Возвращаем отформатированное время в виде строки
  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}





// Функция для показа задачи при нажатии на кнопку этапа
function showTask(event) {
  const taskText = event.target.dataset.task;
  const taskElement = document.querySelector('.task-text');
  taskElement.textContent = taskText;
  taskElement.style.display = 'block';
}

// Функция для перехода на следующий этап
function goToNextLevel(event) {
  const levelItems = document.querySelectorAll('.level-item .dot');
  const currentLevel = event.target.dataset.level;
  const nextLevel = parseInt(currentLevel) + 1;

  // Скрываем текущий этап (делаем его серым)
  event.target.classList.add('passed');

  // Показываем следующий этап
  if (nextLevel <= levelItems.length) {
    levelItems[nextLevel - 1].classList.add('active');
  }

  // Скрываем текст задачи после правильного ответа
  const taskElement = document.querySelector('.task-text');
  taskElement.style.display = 'none';
}

// Функция для запуска/остановки музыки
function toggleMusic() {
  const audioElement = document.querySelector('#bg-music');
  if (audioElement.paused) {
    audioElement.play();
  } else {
    audioElement.pause();
  }
}


// Обработчики событий при наведении на кнопки этапов
const levelButtons = document.querySelectorAll('.level-item .dot');
levelButtons.forEach(button => {
  button.addEventListener('mouseover', showTask);
  button.addEventListener('click', goToNextLevel);
});

// Обработчик события при клике на кнопку-ноту музыки
const musicButton = document.querySelector('.nota');
musicButton.addEventListener('click', toggleMusic);

