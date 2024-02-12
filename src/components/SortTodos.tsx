import { Todo } from "../models/Todo";

interface ISortCategoriesProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

export const SortTodos = (props: ISortCategoriesProps) => {
  const sortTodos = () => {
    let newTodoList = [...props.todos];
    newTodoList.sort((a, b) => {
      return a.done === b.done ? 0 : a.done ? 1 : -1;
    });
    props.setTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  };

  return <button onClick={sortTodos}>Sort</button>;
};
