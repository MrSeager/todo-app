import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const MainSite = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const trimmedText = newTodo.trim();
      if (trimmedText) {
        // Add the new todo to the list
        setTodos((prevTodos) => [...prevTodos, {text: trimmedText, completed: false}]);
        // Clear the input
        setNewTodo('');
      }
      event.preventDefault(); // Prevent line break
    }
  };

  const fileredTodos = todos.filter((todo) => {
    if (filterType === 'all') {
      return true;
    } else if (filterType === 'active') {
      return !todo.completed;
    } else if (filterType === 'completed') {
      return todo.completed;
    }
    return true;
  });

  const handleToggleTodo = (index) => {
    setTodos((prevTodos) => 
      prevTodos.map((todo, i) =>
        i === index ? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  const handleDeleteTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i != index));
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return (
    <main>
      <header>
        <h1>Todo</h1>
        <input type='checkbox' />
      </header>
      <section>
        <input type='checkbox' />
        <input type='text' 
               placeholder='Create a new todo...'
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               onKeyDown={handleKeyDown} />
      </section>
      <section>
        <div>
          {fileredTodos.map((todo, index) => (
            <div key={index}>
              <input type='checkbox'
                     checked={todo.completed}
                     onChange={() => handleToggleTodo(index)} />
              <p>{todo.text}</p>
              <button onClick={() => handleDeleteTodo(index)}>X</button>
            </div>
          ))}
        </div>
        <div>
          <p>{fileredTodos.length} item{fileredTodos.length > 1 && 's'} left</p>
          <a onClick={() => setFilterType('all')}>All</a>
          <a onClick={() => setFilterType('active')}>Active</a>
          <a onClick={() => setFilterType('completed')}>Completed</a>
          <a onClick={handleClearCompleted}>Clear Completed</a>
        </div>
      </section>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainSite />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
