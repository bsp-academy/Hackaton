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

// Запуск таймера при загрузке страницы
window.addEventListener('load', function () {
  const timerElement = document.querySelector('.timer');
  
// Ваш код для таймера, например:
   const startTime = Date.now();
   setInterval(() => {
     const currentTime = Date.now();
     const elapsedTime = currentTime - startTime;
     // Обновление таймера на странице
  timerElement.textContent = formatTime(elapsedTime);
 }, 1000);
});

// Обработчики событий при наведении на кнопки этапов
 const levelButtons = document.querySelectorAll('.level-item .dot');
 levelButtons.forEach(button => {
   button.addEventListener('mouseover', showTask);
   button.addEventListener('click', goToNextLevel);
 });

// Обработчик события при клике на кнопку-ноту музыки
const musicButton = document.querySelector('.nota');
musicButton.addEventListener('click', toggleMusic);
  
 