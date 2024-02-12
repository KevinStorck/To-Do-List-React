import { ChangeEvent, useState } from "react";
import { Category } from "../models/Category";
import { Todo } from "../models/Todo";
import "../components/ManageCategories.css";
import bin from "../assets/bin.png";
import add from "../assets/add.png";

interface IManageCategoriesProps {
  todos: Todo[];
  categories: Category[];
  setCategories: (category: Category[]) => void;
  setInputCategory: (category: Category) => void;
}

export const ManageCategories = (props: IManageCategoriesProps) => {
  const [showCategories, setShowCategories] = useState(false);
  const [newCategory, setNewCategory] = useState<string>();

  const removeCategory = (categoryR: Category) => {
    props.setInputCategory(props.categories[0]);
    if (props.categories.length == 1)
      props.setInputCategory(new Category("No Category"));
    for (let i = 0; i < props.categories.length; i++) {
      if (props.categories[i].name === categoryR.name) {
        props.setCategories(
          props.categories.filter(
            (category) => category.name !== categoryR.name
          )
        );
        localStorage.setItem(
          "categories",
          JSON.stringify(
            props.categories.filter(
              (category) => category.name !== categoryR.name
            )
          )
        );
        return;
      }
    }
  };

  const addCategory = () => {
    if (!newCategory) return;

    props.setCategories([...props.categories, new Category(newCategory)]);
    localStorage.setItem(
      "categories",
      JSON.stringify([...props.categories, new Category(newCategory)])
    );
    console.log(props.categories);

    if (props.categories.length == 0)
      props.setInputCategory(new Category(newCategory));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleClick = () => {
    setShowCategories(!showCategories);
  };

  const ManageCategoriesHTML = () => {
    if (showCategories == false) return;
    return (
      <div id="manage-categories-container">
        <div id="manage-categories-header">
          <h3>Manage Categories</h3>
          <img onClick={handleClick} src={add} alt="Close-window-icon" />
        </div>
        {props.categories.map((category) => {
          return (
            <div key={category.name} className="manage-this-category">
              <p>{category.name}</p>
              <div
                className="remove-btn"
                onClick={() => {
                  removeCategory(category);
                }}
              >
                <a className="bin-lid"></a>
                <img src={bin} />
              </div>
            </div>
          );
        })}
        <input
          className="input-field"
          placeholder="New Category"
          onChange={handleChange}
        ></input>
        <button className="btn" onClick={addCategory}>
          Add Category
        </button>
      </div>
    );
  };

  return (
    <>
      <button onClick={handleClick}>Manage Categories</button>
      {ManageCategoriesHTML()}
    </>
  );
};
