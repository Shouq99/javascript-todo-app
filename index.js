const todoList = document.querySelector('.todo-list');
const addButton = document.querySelector('#add-btn');
const todoInput = document.querySelector('#todo-input');
const searchinput = document.querySelector('#search-input');
const searchform = document.querySelector('.search');
const todoCount = document.querySelector('.todo-count');


const todos = [
	// {  description:'shouq A', completed: true},
	// {  description:'jojo A', completed: true},
	// {  description:'roro A', completed: true},
];

 function displayTodo(todos){
	todoList.innerHTML ='';
	if (todos.length  === 0 ){
		console.log('no todos found');
	} else {
		for (let index = 0; index < todos.length; index++ ){
			const todoItem = document.createElement('div');
             todoItem.classList.add('todo');
		

		const todoCheckbox = document.createElement('input');
		todoCheckbox.type ="checkbox";

		todoCheckbox.checked =todos[index].completed;
		todoItem.appendChild(todoCheckbox );

		const todoDescription = document.createElement('p');
		todoDescription.textContent = todos[index].description;
		todoItem.appendChild(todoDescription);


			const todoDeleteButton = document.createElement('button');
			todoDeleteButton.textContent = "Delete";
			todoDeleteButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="delete" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
			todoDeleteButton.addEventListener("click", ()=> deleteTodo(index));
			todoItem.appendChild(todoDeleteButton);

			const todoEditButton = document.createElement('button');
			todoEditButton.textContent = "Edit";
			todoEditButton.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="edit" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>';
			todoEditButton.addEventListener("click", ()=> updateTodo(index));
			todoItem.appendChild(todoEditButton);

			todoList.appendChild(todoItem);
			todoCount.textContent = `Total num of todo ${todos.length}`;
			}
			} }



function addTodo(){
	const todoDescription = todoInput.value.trim();
	const newTodo={
	description : todoDescription,
	completed: false
};
	 todos.push(newTodo);
	displayTodo(todos);
	localStorage.setItem("todos", JSON.stringify(todos))
}

const updateTodo = (index) => {

   const newDescription = prompt('Edit Todo:', todos[index].description);
   if(newDescription){
	todos[index].description = newDescription;
	localStorage.setItem("todos", JSON.stringify(todos));
	displayTodo(todos);

   }

	console.log("Updated todo list:", todos);
	localStorage.setItem("todos", JSON.stringify(todos));
   }
   

function deleteTodo(index){
	todos.splice(index, 1);
	displayTodo(todos);
	localStorage.setItem("todos", JSON.stringify(todos))

}


const searchTodos = (event) => {

const searchValue =event.target.value;
const formattedSearchValue = searchValue.trim().toLowerCase();
const matchedTodos = todos.filter((todo) =>
todo.description.toLowerCase().includes(formattedSearchValue));
displayTodo(matchedTodos);
};


	// addButton.addEventListener('click', addTodo);
	// searchform.addEventListener('submit', function
	// (event){
	// 	event.preventDefault();
	// 	console.log(searchinput.value);

	// });
	// displayTodo(todos);

function loadDataFromLocalStorage(){
	const storedtodos = JSON.parse(localStorage.getItem
		('todos'));
		if(storedtodos){
			todos = storedtodos;
			displayTodo(todos);

		}
}

	window.addEventListener('DOMContentLoaded',
	loadDataFromLocalStorage);
	addButton.addEventListener('click', addTodo);
   searchinput.addEventListener('input', searchTodos)