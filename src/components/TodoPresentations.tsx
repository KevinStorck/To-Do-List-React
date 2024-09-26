import { Todo } from "../models/Todo";
import "../components/TodoPresentations.css";
import bin from "../assets/bin.png";
import pin from "../assets/pin.png";

interface ITodosPresentationProps {
  todos: Todo[];
  removeTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  manualMode: Boolean;
}

export const TodoPresentations = (props: ITodosPresentationProps) => {
  const newDate = (date: Date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
  };

  function moveTodo(todo: Todo, e: React.MouseEvent) {
    if (e === undefined) return
    if (e.target === null) return
    if ((e.target as HTMLDivElement).id !== "movetodotrue") return;
    if (!props.manualMode) return;
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let todoPositionX: number, todoPositionY: number;
    let todoelement = (e.target as HTMLDivElement).parentNode;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = todoOnMouseUp;
    document.onmousemove = dragTodo;

    function dragTodo(e: MouseEvent) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      todoPositionX = (todoelement as HTMLDivElement).offsetLeft - pos1;
      todoPositionY = (todoelement as HTMLDivElement).offsetTop - pos2;
      (todoelement as HTMLDivElement).style.left = `${todoPositionX}px`;
      (todoelement as HTMLDivElement).style.top = `${todoPositionY}px`;
    }

    function todoOnMouseUp() {
      let storedTodoList = JSON.parse(localStorage.getItem("todos") || "");
      if (todoPositionX) todo.position[0] = todoPositionX;
      if (todoPositionY) todo.position[1] = todoPositionY;
      let newTodoList = storedTodoList.map((todoxd: Todo) => {
        return todoxd.id === todo.id ? todo : todoxd;
      });
      localStorage.setItem("todos", JSON.stringify(newTodoList));
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  const position = () => {
    if (props.manualMode) return "absolute";
  };

  const style = (todo: Todo) => {
    if (props.manualMode) {
      return { left: todo.position[0], top: todo.position[1] };
    } else return;
  };

  return (
    <div id="todo-container">
      {props.todos.map((todo: Todo) => {
        return (
          <div
            className={`todo-card done${JSON.stringify(
              todo.done
            )} ${position()}`}
            style={style(todo)}
            key={todo.id}
          >
            <div className="card-header">
              <h3>{todo.header}</h3>
              <img className="pin-img" src={pin} alt="pin" />
              <div
                className={`done-div${JSON.stringify(todo.done)}`}
                onClick={() => {
                  todo.done = !todo.done;
                  props.updateTodo(todo);
                }}
              ></div>
              <div
                className={`heart${JSON.stringify(todo.heart)}`}
                onClick={() => {
                  todo.heart = !todo.heart;
                  props.updateTodo(todo);
                }}
              ></div>
              <p className="category">{todo.category.name}</p>
              <time>Created: {newDate(todo.date)}</time>
            </div>
            <div className="card-body">
              <p>{todo.body}</p>
              <div
                className="remove-btn"
                onClick={() => {
                  props.removeTodo(todo);
                }}
              >
                <a className="bin-lid"></a>
                <img src={bin} />
              </div>
            </div>
            <div
              onMouseDown={(event) => {
                moveTodo(todo, event);
              }}
              id={`movetodo${props.manualMode}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
