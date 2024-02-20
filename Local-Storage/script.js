// array responsible for storing data
const todos = [];

document.querySelector("#add-btn").addEventListener("click", function(){
    const todoName = document.querySelector('#todo-name').value;
    todoName.push(todoName);
})

// responsible for the display
function renderTodos() {
    const todoList = document.querySelector("#todo-list");
    

}


// document.querySelector("#add-btn").addEventListener("click", function(){
//     const todoName = document.querySelector("#todo-name").value;
//     const todoList = document.querySelector("#todo-list")
//     const liElement = document.createElement()
//     liElement.innerHTML = todoName
//     todoList
// })