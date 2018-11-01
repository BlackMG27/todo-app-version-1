let todos = getSavedTodos()

const filters = {
    searchText: ''
}

renderTodos(todos, filters)

document.querySelector('#searchTodo').addEventListener('input', function (e) {
        filters.searchText = e.target.value
        renderTodos(todos, filters)
    })

document.querySelector('#todoForm').addEventListener('submit', function(e){
    //prevent page reload
    e.preventDefault()
    //grab the new todo value
    let eValue = document.getElementById('addTodo').value
    //create an object to store new todo
    const addTodo = {
            id: uuidv4(),
            text: eValue,
            completed: false
        }
    //push new todo into the todos array    
    todos.push(addTodo)
    //send to localStorage
    localStorage.setItem('todos', JSON.stringify(todos))
    //rerender the todos list
    renderTodos(todos, filters)
    //clear the input
    e.target.elements.addTodo.value = ''  
})    

document.querySelector('#hideCompleted').addEventListener('change', function(e){
    //once clicked, all completed todos are removed/filtered out 
   filters.hideCompleted = e.target.checked
   renderTodos(todos, filters)
})
