import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
console.log(todos)
  // Fetch todos from the server
  useEffect(() => {
    axios.get('/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  // Add a new todo
  const addTodo = () => {
    axios.post('/api/todos', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  // Update a todo
  const updateTodo = (id, updatedTodo) => {
    axios.put(`/api/todos/${id}`, updatedTodo)
      .then(response => {
        const updatedTodos = todos.map(todo =>
          todo.id === response.data.id ? response.data : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={e => updateTodo(todo.id, { title: e.target.value })}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

export default TodoList;
