const input = document.getElementById('input');
const addBtn = document.getElementById('add-task');
const noTasks = document.getElementById('no-tasks');
const itemsLeft = document.getElementById('items-left');
const allBtn = document.getElementById('all');
const activeBtn = document.getElementById('active');
const completedBtn = document.getElementById('completed');
const clearCompletedBtn = document.getElementById('clear-completed');

const lightModeBtn = document.getElementById('light-mode-button');
const darkModeBtn = document.getElementById('dark-mode-button');


function toggleLight() {
  document.body.classList.toggle('light-theme');
  lightModeBtn.classList.remove('hidden');
  darkModeBtn.classList.add('hidden');

  document.querySelector('.background').style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")';
}

function toggleDark() {
  document.body.classList.toggle('light-theme');
  lightModeBtn.classList.add('hidden');
  darkModeBtn.classList.remove('hidden');
  document.querySelector('.background').style.backgroundImage = 'url("./images/bg-desktop-light.jpg")';
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) {
    return [];
  }

  // Add check for undefined completed property and set it to false if missing
  return tasks.map((task) => (task.completed === undefined ? { ...task, completed: false } : task));
  
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function showTasks() {
  const remainingTasks = document.querySelector('.remaining-tasks');
  remainingTasks.innerHTML = '';

  const tasks = getTasks();
  let uncheckedTaskCount = 0;

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    taskDiv.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox-${index + 1}" ${task.completed ? 'checked' : ''}>
        <label for="checkbox-${index + 1}"></label>
      </div>
      <div class="task-content">
      <p ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.content || task}</p>
        <button class="delete-task"><img src="./images/icon-cross.svg" alt="Cross/Close icon"></button>
      </div>
    `;

    taskDiv.querySelector('.delete-task').addEventListener('click', () => {
      deleteTask(index);
    });

    taskDiv.querySelector('input[type="checkbox"]').addEventListener('change', (event) => {
      const taskContent = event.target.closest('.task').querySelector('.task-content p');
      task.completed = event.target.checked;
      if (event.target.checked) {
        taskContent.style.textDecoration = 'line-through';
        uncheckedTaskCount--;
      } else {
        taskContent.style.textDecoration = 'none';
        uncheckedTaskCount++;
      }
      saveTasks(tasks);
      itemsLeft.innerHTML = `${uncheckedTaskCount} items left`;
    });

    remainingTasks.appendChild(taskDiv);

    if (!task.completed) {
      uncheckedTaskCount++;
    }
  });

  itemsLeft.innerHTML = `${uncheckedTaskCount} items left`;

  if (tasks.length === 0) {
    noTasks.style.display = 'flex';
  } else {
    noTasks.style.display = 'none';
  }
}

function showActiveTasks() {
  const remainingTasks = document.querySelector('.remaining-tasks');
  remainingTasks.innerHTML = '';

  const tasks = getTasks().filter(task => !task.completed);

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    taskDiv.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" id="checkbox-${index + 1}" ${task.completed ? 'checked' : ''}>
        <label for="checkbox-${index + 1}"></label>
      </div>
      <div class="task-content">
        <p ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.content || task}</p>
        <button class="delete-task"><img src="./images/icon-cross.svg" alt="Cross/Close icon"></button>
      </div>
    `;

    taskDiv.querySelector('.delete-task').addEventListener('click', () => {
      deleteTask(index);
    });

    taskDiv.querySelector('input[type="checkbox"]').addEventListener('change', (event) => {
      const taskContent = event.target.closest('.task').querySelector('.task-content p');
      task.completed = event.target.checked;
      if (event.target.checked) {
        taskContent.style.textDecoration = 'line-through';
      } else {
        taskContent.style.textDecoration = 'none';
      }
      saveTasks(tasks);
      showActiveTasks();
    });

    remainingTasks.appendChild(taskDiv);
  });

  if (tasks.length === 0) {
    noTasks.style.display = 'flex';
  } else {
    noTasks.style.display = 'none';
  }
}

function addTask() {
  const taskContent = input.value.trim();

  if (taskContent !== '') {
    let tasks = getTasks();
    tasks.push({ content: taskContent, completed: false });
    saveTasks(tasks);

    showTasks();
    input.value = '';
  }
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    showTasks();
}

function clearCompleted() {
  const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  let tasks = getTasks();

  tasks = tasks.filter((task, index) => !checkboxes[index].checked);

  saveTasks(tasks);
  showTasks();
}

const removeAllActive = () => {

  allBtn.classList.remove('selected');
  activeBtn.classList.remove('selected');
  completedBtn.classList.remove('selected');

};

const handleButtonClick = (button) => {

  removeAllActive();
  button.classList.add('selected');
  
};

showTasks();

addBtn.addEventListener('click', addTask);

allBtn.addEventListener('click', () => {
    handleButtonClick(allBtn);
    showTasks();
});

activeBtn.addEventListener('click', () => {
  handleButtonClick(activeBtn);
  showActiveTasks();
});

completedBtn.addEventListener('click', () => {
    handleButtonClick(completedBtn);
});

clearCompletedBtn.addEventListener('click', clearCompleted);

lightModeBtn.addEventListener('click', toggleDark);
darkModeBtn.addEventListener('click', toggleLight);