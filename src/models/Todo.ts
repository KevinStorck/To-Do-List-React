import { Category } from "./Category";

export class Todo {
  constructor(
    public header: string,
    public body: string,
    public category: Category,
    public date: Date,
    public done: boolean,
    public heart: boolean,
    public id: number,
    public position: [number, number]
  ) {}
}
