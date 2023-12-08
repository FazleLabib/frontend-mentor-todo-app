const input = document.getElementById('input');
const addBtn = document.getElementById('add-task');
const noTasks = document.getElementById('no-tasks');
const itemsLeft = document.getElementById('items-left');
const allBtn = document.getElementById('all');
const clearCompletedBtn = document.getElementById('clear-completed');

function getTasks() {

    let tasks = localStorage.getItem('tasks');

    if (tasks) {
      return JSON.parse(tasks);
    }

    return [];

}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTasks() {

  const remainingTasks = document.querySelector('.remaining-tasks');

  remainingTasks.innerHTML = '';
  
  const tasks = getTasks();

  let taskCount = tasks.length;
  itemsLeft.innerHTML = `${taskCount} items left`;
  
  tasks.forEach((task, index) => {

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
  
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
  
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `checkbox-${index + 1}`);
      
  
    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', `checkbox-${index + 1}`);
  
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
  
    const taskContentDiv = document.createElement('div');
    taskContentDiv.classList.add('task-content');
  
    const taskParagraph = document.createElement('p');
    taskParagraph.textContent = task;
  
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', './images/icon-cross.svg');
    deleteIcon.setAttribute('alt', 'Cross/Close icon');
    deleteButton.appendChild(deleteIcon);
    
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });
  
    taskContentDiv.appendChild(taskParagraph);
    taskContentDiv.appendChild(deleteButton);
  
    taskDiv.appendChild(checkboxContainer);
    taskDiv.appendChild(taskContentDiv);
        
    remainingTasks.appendChild(taskDiv);

    

  });

  if (tasks.length === 0) {
    noTasks.style.display = 'flex';
  } else {
    noTasks.style.display = 'none';
  }

  // Strikes through completed tasks
  const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', (event) => {
      const taskContent = event.target.closest('.task').querySelector('.task-content p');
      if (checkbox.checked) {
        taskContent.style.textDecoration = 'line-through';
      } else {
        taskContent.style.textDecoration = 'none';
      }
    });
  }
    
}
  
function addTask() {

    const task = input.value.trim();
  
    if (task !== '') {
      let tasks = getTasks();
      tasks.push(task);
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

showTasks();

addBtn.addEventListener('click', addTask);
allBtn.addEventListener('click', showTasks);
clearCompletedBtn.addEventListener('click', clearCompleted);