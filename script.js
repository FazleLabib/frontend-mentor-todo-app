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
  setBackground();
}

function toggleDark() {
  document.body.classList.toggle('light-theme');
  lightModeBtn.classList.add('hidden');
  darkModeBtn.classList.remove('hidden');
  setBackground();
}

function setBackground() {
  if (window.innerWidth <= 600) {
    if (document.body.classList.contains('light-theme')) {
      document.querySelector('.background').style.backgroundImage = 'url("./images/bg-mobile-light.jpg")';
    } else {
      document.querySelector('.background').style.backgroundImage = 'url("./images/bg-mobile-dark.jpg")';
    }
  } else {
    if (document.body.classList.contains('light-theme')) {
      document.querySelector('.background').style.backgroundImage = 'url("./images/bg-desktop-light.jpg")';
    } else {
      document.querySelector('.background').style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")';
    }
  }
}

setBackground();
window.addEventListener('resize', setBackground);

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
    taskDiv.setAttribute('draggable', 'true');
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
        taskContent.style.color = `var(--secondary-text-color)`;
        uncheckedTaskCount--;
      } else {
        taskContent.style.textDecoration = 'none';
        taskContent.style.color = `var(--text-color)`;
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

function showCompletedTasks() {
  const remainingTasks = document.querySelector('.remaining-tasks');
  remainingTasks.innerHTML = '';

  const tasks = getTasks().filter(task => task.completed);

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
      showCompletedTasks();
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
  showCompletedTasks();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

lightModeBtn.addEventListener('click', toggleDark);
darkModeBtn.addEventListener('click', toggleLight);

// Make tasks draggable
const taskDivs = document.querySelectorAll('.task');
taskDivs.forEach(taskDiv => {
  taskDiv.addEventListener('dragstart', () => {
    taskDiv.classList.add('dragging');
  });
  taskDiv.addEventListener('dragend', () => {
    taskDiv.classList.remove('dragging');

    // Update tasks in local storage after reordering
    const tasks = Array.from(document.querySelectorAll('.task')).map(task => {
      return {
        content: task.querySelector('.task-content p').textContent,
        completed: task.querySelector('input[type="checkbox"]').checked
      };
    });
    saveTasks(tasks);
  });
});

function changeOptionsLayout() {
  const filtersDiv = document.querySelector('.filters');
  const instructions = document.querySelector('.instruction');
  const containerDiv = document.querySelector('.container');

  if (window.innerWidth <= 600) {
    // Move filters class before instructions class:
    containerDiv.insertBefore(filtersDiv, instructions);
  } else {
    // Move filters class inside options class:
    const optionsDiv = document.querySelector('.options');
    optionsDiv.insertBefore(filtersDiv, optionsDiv.querySelector('#clear-completed'));
  }
}

window.addEventListener('resize', changeOptionsLayout);
changeOptionsLayout();







