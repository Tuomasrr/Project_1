// Valitaan HTML-elementit
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Klikkauskuuntelija lisää tehtävän
addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        // Luo uusi tehtäväelementti
        const li = document.createElement("li");
        li.textContent = taskText;

        // Lisää poistonappi
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", function () {
            taskList.removeChild(li);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        // Tyhjennetään syötekenttä
        taskInput.value = "";
    }
});