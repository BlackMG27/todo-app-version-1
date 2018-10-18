const getSavedTodos = function() {
  const todoJSON = localStorage.getItem('todos');
  if (todoJSON !== null) {
    return JSON.parse(todoJSON);
  } else {
    return [];
  }
};

const removeTodos = function(id) {
  const todoIndex = todos.findIndex(function(todo) {
    return (todo.id = id);
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

const generateTodos = function(todo) {
  const todoDiv = document.createElement('div');
  const todoTitle = document.createElement('span');
  const todoCheckbox = document.createElement('input');
  const deleteTodo = document.createElement('button');

  todoCheckbox.setAttribute('type', 'checkbox');
  todoCheckbox.checked = todo.completed;
  todoDiv.appendChild(todoCheckbox);

  todoCheckbox.addEventListener('change', function(e) {
    toggleTodo(todo.id);
    getSavedTodos(todos);
    renderTodos(todos, filters);
  });

  if (todo.text.length > 0) {
    todoTitle.textContent = todo.text;
  } else {
    todoTitle.textContent = 'Unnamed Todo';
  }
  todoDiv.appendChild(todoTitle);

  //setup the remove button
  deleteTodo.textContent = 'X';
  deleteTodo.addEventListener('click', function() {
    //remove the deleted item
    removeTodos(todo.id);
    //save the list
    getSavedTodos(todos);
    //re-display the list
    renderTodos(todos, filters);
  });
  todoDiv.appendChild(deleteTodo);
  document.querySelector('#todo').appendChild(todoDiv);
};

const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    //condeses the code
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    //equals the commeted out code below
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  //console.log(todos);

  document.querySelector('#todo').innerHTML = '';

  const incompleteTodos = filteredTodos.filter(function(todo) {
    const isDone = todo.completed;
    return !isDone;
  });

  const newPS = document.createElement('h2');
  newPS.textContent = `You have ${incompleteTodos.length} todos left.`;
  document.querySelector('#todo').appendChild(newPS);

  filteredTodos.forEach(function(todo) {
    const todoTitle = generateTodos(todo);
  });
};
