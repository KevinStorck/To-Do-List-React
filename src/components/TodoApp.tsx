import { useState } from "react";
import { TodoPresentations } from "../components/TodoPresentations";
import { Todo } from "../models/Todo";
import { TodoMenu } from "../components/TodoMenu";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [manualMode, setManualMode] = useState<Boolean>(false);

  const removeTodo = (todoToBeRemoved: Todo) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todoToBeRemoved.id) {
        setTodos(todos.filter((todo) => todo.id !== todoToBeRemoved.id));
        localStorage.setItem(
          "todos",
          JSON.stringify(todos.filter((todo) => todo.id !== todoToBeRemoved.id))
        );
        return;
      }
    }
  };

  const updateTodo = (updatedTodo: Todo) => {
    let newTodoList = todos.map((todo) => {
      return todo.id === updatedTodo.id ? updatedTodo : todo;
    });
    setTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  };

  return (
    <>
      <TodoMenu
        setTodos={setTodos}
        todos={todos}
        manualMode={manualMode}
        setManualMode={setManualMode}
      />
      <TodoPresentations
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        manualMode={manualMode}
      />
    </>
  );
}
