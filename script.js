const inputSelector = document.getElementById("todo-list__input");
const addBtnSelector = document.getElementById("todo-list__submit");
const tasksWrapperSelector = document.getElementById("todo-list__tasks-wrapper");
const deleteBtnSelector = document.getElementsByClassName("todo-list__item-delete");

let tasksArray;
let taskName;

function createTaskObject(value) {
	this.content = value;
}

const refreshTasks = () => {
	localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
};

const generateNewHTML = (newTask, index) => {
	return `
	<div class="todo-list__item">
		<p class="todo-list__item-name">${newTask.content}</p>
		<button class="todo-list__item-delete" onclick="deleteTask(${index})"></button>
	</div>
	`;
};

const addNewHtml = () => {
	tasksArray.forEach((content, index) => {
		tasksWrapperSelector.innerHTML += generateNewHTML(content, index);
	});
};

const deleteTask = (index) => {
	tasksArray.splice(index, 1);
	refreshTasks();
	tasksWrapperSelector.innerHTML = "";
	addNewHtml();
};

addBtnSelector.onclick = () => {
	taskName = inputSelector.value;
	inputSelector.value = "";

	if (taskName != "") {
		tasksArray.push(new createTaskObject(taskName));
		tasksWrapperSelector.innerHTML = "";
		addNewHtml();
		refreshTasks();
	}
};

!localStorage.tasksArray ? (tasksArray = []) : (tasksArray = JSON.parse(localStorage.getItem("tasksArray")));
addNewHtml();
