import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';

import ImgX from './images/icon-cross.svg';
import ImgCheckbox from './images/icon-check.svg';

const MainSite = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);   
    }
  }, [parentRef]);

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

  const handleDarkModeCheckbox = () => {
    setDarkMode((prevIsDark) => !prevIsDark);
  };

  return (
    <main className={`cs-bg-${darkMode ? 'dark' : 'light'} d-flex flex-column align-items-center justify-items-center`}>
      <header className='container d-flex flex-row align-items-center justify-content-between'>
        <h1 className='h1 text-uppercase text-white fw-bold'>Todo</h1>
        <input className='form-check-input' type='checkbox' value="" id='customCheckbox' onClick={handleDarkModeCheckbox} />
      </header>
      <section className='container p-3 m-3 d-flex flex-row align-items-center justify-content-between bg-white rounded'>
        <div className='spinner-border text-muted'></div>
        <input className='container no-border' type='text' 
               placeholder='Create a new todo...'
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               onKeyDown={handleKeyDown} />
      </section>
      <section id='s2' className='container d-flex flex-column bg-white shadow-sm bg-body rounded'>
        <div ref={parentRef} className='container-flued d-flex flex-column'>
          {fileredTodos.map((todo, index) => (
            <div className='container p-2 borderBottom d-flex flex-row align-items-center justify-content-between' key={index}>
              <div class="form-check">
                <input className='form-check-input'
                      id="customCheckbox2"
                      type='checkbox'
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(index)} />
                <label class="form-check-label" for="customCheckbox2"><img src={ImgCheckbox} /></label>                
              </div>
              <p className='container text-start m-0'>{todo.text}</p>
              <button className='btn' onClick={() => handleDeleteTodo(index)}><img src={ImgX} alt='close' /></button>
            </div>
          ))}
        </div>
        <div id='btmNav' className='container-flued paddingNav d-flex flex-row align-items-center justify-content-between'>
          <a>{fileredTodos.length} item{fileredTodos.length > 1 && 's'} left</a>
          <div className='btn-group'>
            <a className='btn' onClick={() => setFilterType('all')}>All</a>
            <a className='btn' onClick={() => setFilterType('active')}>Active</a>
            <a className='btn' onClick={() => setFilterType('completed')}>Completed</a>
          </div>
          <a className='btn' onClick={handleClearCompleted}>Clear Completed</a>
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
