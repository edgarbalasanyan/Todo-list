let completedCount = 0;
let remainingCount = 3;
let tasks = [];

function addTask() {
    let input = document.getElementById("taskInput");
    let deadlineInput = document.getElementById("deadlineInput");
    let task = input.value;
    let deadline = new Date(deadlineInput.value);
    
    if (task !== "") {
        let taskObj = {
            name: task,
            deadline: deadline
        };
        
        tasks.push(taskObj);
        
        let li = createTaskListItem(taskObj);
        
        document.getElementById("taskList").appendChild(li);
        input.value = "";
        deadlineInput.value = "";
        remainingCount++;
        updateCounter();
        
        checkDeadline(taskObj, li); // Check the deadline for the added task
    }
}

function checkDeadline(task, li) {
    let currentDate = new Date();
    let oneDayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    if (task.deadline - currentDate <= oneDayInMillis) {
        li.classList.add("one-day");
    }
    if (task.deadline - currentDate <= 60 * 60 * 1000){
        li.classList.add("one-hour");
        let message = document.createElement("span");
        message.textContent = "Warning: less than one hour left until deadline";
        li.appendChild(message)
        alert("you have task with deadline less than an hour away")
    }
}


function createTaskListItem(task) {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        handleCheckboxChange(this);
    });
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function() {
        deleteTask(this.parentNode);
    });
    let deadlineLabel = document.createElement("span");
    deadlineLabel.className = "deadline-label";
    deadlineLabel.textContent = `Deadline: ${task.deadline.toLocaleString()}`;
    
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.name));
    if(task.deadline){
        li.appendChild(deadlineLabel);
    }
    li.appendChild(deleteButton);
    
    return li;
}

function handleCheckboxChange(checkbox) {
    let li = checkbox.parentNode;
    if (checkbox.checked) {
        li.classList.add("completed");
        completedCount++;
        remainingCount--;
    } else {
        li.classList.remove("completed");
        completedCount--;
        remainingCount++;
    }
    updateCounter();
}

function deleteTask(li) {
    let ul = li.parentNode;
    if (li.classList.contains("completed")) {
        completedCount--;
    } else {
        remainingCount--;
    }
    ul.removeChild(li);
    updateCounter();
}

function updateCounter() {
    document.getElementById("completedCount").textContent = completedCount;
    document.getElementById("remainingCount").textContent = remainingCount;
}
