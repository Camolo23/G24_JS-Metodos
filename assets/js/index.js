const newTaskInput = document.querySelector("#new-task-input")
const taskTable = document.querySelector("#task-table")
const addTaskBtn = document.querySelector("#add-task")
const taskCounter = document.querySelector("#task-counter")
const btnUpdate = document.querySelector("#btn-update")
const showFinished = document.querySelector("#finished")

const tasks = [
    { id: 2450003, description: "Sacar la basura", complete: false },
    { id: 2450004, description: "Revisar el correo", complete: false },
    { id: 2450005, description: "Pasear al perro", complete: false }
]

renderTaskTable(tasks)

function renderTaskTable(tasks) {
    let currentId = 0
    let html = ""
    tasks.forEach(task => {
        if (task.complete === false) {
            // RENDERER CHECKBOX DESACTIVADO
            currentId = currentId + 1
            html = html + `
            <tr>
                <td scope="row">${currentId}</td>
                <td>${task.description}</td>
                <td><input type="checkbox" onclick="completedTask(${currentId})"></td>
                <td>
                    <button class="btn btn-outline-light p-1 w-50 border-0" onclick="
                        deleteTask(${task.id})">
                            <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </td>
            </tr>
            `
        }
        else if (task.complete === true) {
            // RENDERER CHECKBOX ACTIVADO
            currentId = currentId + 1
            html = html + `
            <tr>
                <td scope="row">${currentId}</td>
                <td>${task.description}</td>
                <td><input checked type="checkbox" onclick="completedTask(${currentId})"></td>
                <td>
                    <button class="btn btn-outline-light p-1 w-50 border-0" onclick="
                        deleteTask(${task.id})">
                            <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </td>
            </tr>
            `
        }
    })
    taskTable.innerHTML = html
    taskCounter.innerHTML = tasks.length
}

function deleteTask(id) {
    const indexTask = tasks.findIndex((ele) => ele.id == id)
    tasks.splice(indexTask, 1)
    renderTaskTable(tasks)
}

function completedTask(id) {
    if (tasks[id - 1].complete === false) {
        tasks[id - 1].complete = true
    }
    else if (tasks[id - 1].complete === true) {
        tasks[id - 1].complete = false
    }
    const finishedTasks = tasks.filter((task) => task.complete === true)
    showFinished.innerHTML = finishedTasks.length
}

addTaskBtn.addEventListener("click", () => {
    if (newTaskInput.value != "") {
        const newTask = newTaskInput.value
        tasks.push({ id: Date.now(), description: newTask, complete: false })
        newTaskInput.value = ""
        renderTaskTable(tasks)
    }
    else {
        alert("Debes ingresar una tarea")
    }
})