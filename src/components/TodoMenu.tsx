import { useState } from "react";
import { Category } from "../models/Category";
import { Todo } from "../models/Todo";
import { CreateTodo } from "./CreateTodo";
import { ManageCategories } from "./ManageCategories";
import { SortTodos } from "./SortTodos";
import { ManualMode } from "./ManualMode";

interface ITodoMenuProps {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  manualMode: Boolean;
  setManualMode: (manualMode: Boolean) => void;
}

export const TodoMenu = (props: ITodoMenuProps) => {
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem("categories") || `[{"name": "Chores"}]`)
  );
  const [inputCategory, setInputCategory] = useState<Category>(categories[0]);

  return (
    <div id="create-todo-container">
      <CreateTodo
        todos={props.todos}
        setTodos={props.setTodos}
        categories={categories}
        setInputCategory={setInputCategory}
        inputCategory={inputCategory}
      />
      <ManageCategories
        todos={props.todos}
        categories={categories}
        setCategories={setCategories}
        setInputCategory={setInputCategory}
      />
      <SortTodos todos={props.todos} setTodos={props.setTodos} />
      <ManualMode
        manualMode={props.manualMode}
        setManualMode={props.setManualMode}
      />
    </div>
  );
};
