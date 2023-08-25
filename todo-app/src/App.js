import React, { useState } from 'react';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null); // 用于跟踪正在编辑的待办事项的ID

  const handleAddTodo = () => {
    if (currentTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: currentTodo }]);
      setCurrentTodo('');
    }
  };

  const handleEditTodo = (id) => {
    setEditingTodoId(id); // 设置正在编辑的待办事项的ID
    const editedText = todos.find(todo => todo.id === id).text;
    setCurrentTodo(editedText); // 将文本设置为待办事项的文本，以便编辑
  };

  const handleSaveEdit = () => {
    if (editingTodoId !== null) {
      const updatedTodos = todos.map(todo => {
        if (todo.id === editingTodoId) {
          return { ...todo, text: currentTodo };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setCurrentTodo('');
      setEditingTodoId(null); // 退出编辑状态
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
        {editingTodoId !== null ? (
          <>
            <button onClick={handleSaveEdit}>保存编辑</button>
            <button onClick={() => setEditingTodoId(null)}>取消编辑</button>
          </>
        ) : (
          <button onClick={handleAddTodo}>添加</button>
        )}
      </div>
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      />
    </div>
  );
};

export default App;
