import React from 'react';

const TodoList = ({ todos, onDelete, onEdit }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onEdit(todo.id)}>编辑</button>
          <button onClick={() => onDelete(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
