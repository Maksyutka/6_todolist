const inputSelector = document.getElementById("todo-list__input");
const addBtnSelector = document.getElementById("todo-list__submit");
const tasksWrapperSelector = document.getElementById("todo-list__tasks-wrapper");
const deleteBtnSelector = document.getElementsByClassName("todo-list__item-delete");
const doneBtnSelector = document.getElementsByClassName("todo-list__item-done");

let allListItemsArray = [];
let tasksArray;
let taskName;

function createTaskObject(value) {
	this.content = value;
	this.done = false;
}

const refreshTasks = () => {
	localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
};

const generateNewHTML = (newTask, index) => {
	return `
	<div class="todo-list__item">
		<p class="todo-list__item-name">
		<span class="todo-list__item-index">${index + 1}.</span>
		${newTask.content}
		</p>
		<button class="todo-list__item-delete" onclick="deleteTask(${index})"></button>
	</div>
	`;
};

const filterTasks = () => {
	const activeTasks = tasksArray.filter((item) => item.done === false);
	const doneTasks = tasksArray.filter((item) => item.done !== false);
	tasksArray = [...activeTasks, ...doneTasks];
};

const addNewHtml = () => {
	tasksWrapperSelector.innerHTML = "";
	filterTasks();

	tasksArray.forEach((content, index) => {
		tasksWrapperSelector.innerHTML += generateNewHTML(content, index);
	});
};

const deleteTask = (index) => {
	tasksArray.splice(index, 1);

	refreshTasks();
	addNewHtml();
};

addBtnSelector.onclick = () => {
	taskName = inputSelector.value;
	inputSelector.value = "";

	if (taskName != "") {
		tasksArray.push(new createTaskObject(taskName));

		refreshTasks();
		addNewHtml();
	}
};

!localStorage.tasksArray ? (tasksArray = []) : (tasksArray = JSON.parse(localStorage.getItem("tasksArray")));
addNewHtml();
