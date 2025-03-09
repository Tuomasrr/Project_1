var tasks = [];

var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTaskBtn");
var errorMsg = document.getElementById("errorMsg");
var taskList = document.getElementById("taskList");
var taskCounter = document.getElementById("taskCounter");

var showAllBtn = document.getElementById("showAllBtn");
var showActiveBtn = document.getElementById("showActiveBtn");
var showDoneBtn = document.getElementById("showDoneBtn");

// When page loads, get tasks from local storage and show them
window.onload = function () {
  loadTasksFromLocalStorage();
  renderTasks("all");
};

// Adds new task when Add task is clicked
addTaskBtn.addEventListener("click", function () {
  var text = taskInput.value.trim();

  // Check if input is valid
  if (!validateInput(text)) {
    return;
  }

  // Create task object and add to array
  var newTask = {
    text: text,
    done: false
  };
  tasks.push(newTask);

  // Save to localStorage
  saveTasksToLocalStorage();

  // Clear input after adding
  taskInput.value = "";
  removeInputError();

  // render all tasks
  renderTasks("all");
});


showAllBtn.addEventListener("click", function () {
  renderTasks("all");
});
showActiveBtn.addEventListener("click", function () {
  renderTasks("active");
});
showDoneBtn.addEventListener("click", function () {
  renderTasks("done");
});


// Check if the user input is valid
function validateInput(text) {
  if (text.length < 3) {
    showInputError("Task must be at least 3 characters long");
    return false;
  }
  return true;
}

// Shows error message 
function showInputError(msg) {
  errorMsg.textContent = msg;
  taskInput.classList.add("error");
}

// Clear the message
function removeInputError() {
  errorMsg.textContent = "";
  taskInput.classList.remove("error");
}

// Save to localStorage
function saveTasksToLocalStorage() {
  var json = JSON.stringify(tasks);
  localStorage.setItem("myTasks", json);
}

// Loads from localStorage
function loadTasksFromLocalStorage() {
  var saved = localStorage.getItem("myTasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// Show tasks in the taskList, filter is all, active or done
function renderTasks(filter) {
  taskList.innerHTML = ""
    // decides what tasks are showing
  var tasksToShow = [];
  var i;
  if (filter === "active") {
    for (i = 0; i < tasks.length; i++) {
      if (!tasks[i].done) {
        tasksToShow.push(tasks[i]);
      }
    }
  } else if (filter === "done") {
    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].done) {
        tasksToShow.push(tasks[i]);
      }
    }
  } else {
    tasksToShow = tasks; 
  }

  // Create <li> element for each task 
  for (i = 0; i < tasksToShow.length; i++) {
    createTaskListItem(tasksToShow[i]);
  }

  // shows how many active tasks 
  var activeCount = 0;
  for (i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      activeCount++;
    }
  }
  taskCounter.textContent = "Tasks left: " + activeCount;
}

function createTaskListItem(task) {
  var li = document.createElement("li");

  if (task.done === true) {
    li.classList.add("done");
  }

  // create the task text 
  var span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;

  // create done button
  var doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.addEventListener("click", function () {
    toggleTaskDone(task);
  });

  // create remov button
  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    removeTask(task);
  });

  // Append everything
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(removeBtn);

  // Add to the UL
  taskList.appendChild(li);
}

// toggle task as done or not done
function toggleTaskDone(task) {
  task.done = !task.done; 
  saveTasksToLocalStorage();
  renderTasks("all");
}

// Remove a task from the array
function removeTask(task) {
  var index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1); 
  }
  saveTasksToLocalStorage();
  renderTasks("all");
}