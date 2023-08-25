---
theme: fancy
---
在这个笔记中，我们将介绍如何使用React来创建一个简单的待办事项列表应用。该应用允许用户添加、编辑和删除待办事项，帮助用户更好地组织他们的日常任务。

## 准备工作

我们将使用Node.js和npm（Node包管理器）。

## 创建新的React应用

首先，我们需要创建一个新的React应用。在命令行中运行以下命令：


```bash
npx create-react-app todo-app
```

创建一个名为`todo-app`的新文件夹，并在其中设置一个基本的React应用结构。

## 编写组件

进入新创建的应用文件夹：


```bash
cd todo-app
```

现在，我们将开始编写我们的待办事项列表应用。

### 创建TodoList组件

首先，我们将创建一个名为`TodoList`的组件，用于显示待办事项列表。在`src`文件夹中创建一个新的文件`TodoList.js`，并添加以下代码：


```jsx
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

```

### 创建App组件

接下来，我们将创建一个名为`App`的组件，它将包含待办事项的状态并处理添加、编辑和删除功能。在`src`文件夹中的`App.js`文件中，添加以下代码：

```jsx
import React, { useState } from 'react';
import TodoList from './TodoList';

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

```
在上面的代码中，我们添加了一个名为`editingTodoId`的状态，用于跟踪正在编辑的待办事项的ID。当用户点击“编辑”按钮时，我们设置`editingTodoId`为正在编辑的待办事项的ID，并将待办事项的文本内容设置为当前文本。同时，我们更新了按钮，以便显示“保存编辑”和“取消编辑”按钮。

当用户点击“保存编辑”按钮时，我们使用`handleSaveEdit`函数来更新待办事项的文本内容。我们遍历待办事项列表，找到正在编辑的事项，更新其文本内容，然后将修改后的列表设置为新的状态。最后，我们重置当前文本，退出编辑状态，将`editingTodoId`设置为`null`。

在这个组件中，我们使用`useState`来管理待办事项列表和当前输入的待办事项。我们定义了处理添加、编辑和删除待办事项的函数，以及将它们传递给`TodoList`组件。

## 运行应用

在命令行中运行以下命令来启动应用：


```bash
npm start
```

## 总结

通过按照上述步骤，创建了一个使用React的简单待办事项列表应用。这个应用允许用户添加、编辑和删除待办事项，是一个入门级别的React项目示例。
