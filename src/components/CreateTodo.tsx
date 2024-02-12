import { ChangeEvent, useState } from "react";
import { Todo } from "../models/Todo";
import { Category } from "../models/Category";
import "../components/CreateTodo.css";

interface ICreateTodoProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  categories: Category[];
  setInputCategory: (category: Category) => void;
  inputCategory: Category;
}

export const CreateTodo = (props: ICreateTodoProps) => {
  const [headerInput, setHeaderInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    e.target.type == "text" && setHeaderInput(e.target.value);
    e.target.type == "textarea" && setBodyInput(e.target.value);
    e.target.type == "select-one" &&
      props.setInputCategory(new Category(e.target.value));
  };

  function generateID(arr: Todo[]) {
    let newID = Math.random() * Math.pow(10, 17);
    if (!arr) return newID;
    while (arr.find(({ id }) => id === newID))
      newID = Math.random() * Math.pow(10, 17);
    return newID;
  }

  const saveTodoItem = () => {
    if (!headerInput || !bodyInput || !props.inputCategory) return;
    const todo = new Todo(
      headerInput,
      bodyInput,
      props.inputCategory,
      new Date(),
      false,
      false,
      generateID(props.todos),
      [0, 0]
    );
    props.setTodos([...props.todos, todo]);
    localStorage.setItem("todos", JSON.stringify([...props.todos, todo]));
  };

  return (
    <>
      <input
        className="input-field"
        type="text"
        placeholder="Write a Title"
        onChange={handleChange}
        value={headerInput}
      ></input>
      <select onChange={handleChange}>
        {props.categories.map((category) => {
          return <option key={category.name}>{category.name}</option>;
        })}
      </select>
      <textarea
        className="input-field"
        id="todo-body"
        placeholder="What will the Todo contain?"
        onChange={handleChange}
        value={bodyInput}
      ></textarea>
      <button id="save-btn" onClick={saveTodoItem}>
        Save
      </button>
    </>
  );
};
