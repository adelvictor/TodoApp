import { writable } from "svelte/store";
import {v4 as uuidv4} from "uuid"


interface TodoList
{
    Id: string,
    Title: string;
    TodoItems: TodoItem[]
}

interface TodoItem
{
    Id: string,
    Title: string,
    isCompleted: boolean
}

export const AllTodoList = writable<TodoList[]>([]);

export const SelectedTodoListId = writable<string>("");


export function CreateTodoList(title: string) {
    const newTodoList: TodoList  = {
        Id: uuidv4(),
        Title: title,
        TodoItems: []
    }

    
    AllTodoList.update( current => {
        const newTodos = [...current, newTodoList];
        return newTodos; 
    })
}


export function DeleteTodoList(Id: string, isSelectedTodoList: boolean) {
    AllTodoList.update((current) =>{
        const newTodos = current.filter(x => x.Id != Id);
        return newTodos;
    });

    if (isSelectedTodoList) {
        SelectedTodoListId.set("");
    }
}

export function SelectTodoList(id: string) {
    SelectedTodoListId.set(id);
}


export function CreateTodoItem(title: string, todoListId: string) {
    const newTodoItem :TodoItem ={
        Id: uuidv4(),
        Title: title,
        isCompleted: false
    }

    AllTodoList.update( current => {
        let todoList = current.filter( x => x.Id === todoListId)[0];
        todoList.TodoItems = [...todoList.TodoItems, newTodoItem];

        const newTodoLists = [ ...current.filter( x => x.Id !== todoListId), todoList];
        return newTodoLists;
    })
}



export function DeleteTodoItem(id: string, todoListId: string) {
    AllTodoList.update( current => {
        let todoList = current.filter( x => x.Id === todoListId)[0];
        todoList.TodoItems = todoList.TodoItems.filter( x => x.Id !== id);

        const newTodoLists = [ ...current.filter( x => x.Id !== todoListId), todoList];
        return newTodoLists;
    })
}