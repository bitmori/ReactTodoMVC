/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts" />

import {Utils} from "./utils"; // exporting one class

export class TodoModel implements ITodoModel {
    // key used for local storage
    public key: string;
    // a list of tasks
    public todos: ITodo[];
    // a list of events
    public onChanges: any[];

    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    }

    public subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    public inform() {
        Utils.store(this.key, this.todos);
        this.onChanges.forEach((callback) => {
            callback();
        });
    }

    public addTodo(title: string) {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title: title,
            completed: false
        });
        this.inform();
    }

    public toggleAll(checked) {
        // look at immutable.js
        this.todos = this.todos.map<ITodo>((todo: ITodo) => {
            return Utils.extend({}, todo, {completed: checked});
        });
        this.inform();
    }

    public toggle(todoToToggle) {
        this.todos = this.todos.map<ITodo>((todo: ITodo) => {
            return todo !== todoToToggle ?
                todo : Utils.extend({}, todo, {completed: !todo.completed});
        });
        this.inform();
    }

    public destroy(todo) {
        this.todos = this.todos.filter((candidate) => {
            return candidate !== todo;
        });
        this.inform();
    }

    public save(todoToSave, text) {
        this.todos = this.todos.map<ITodo>((todo) => {
            return todo !== todoToSave ?
                todo : Utils.extend({}, todo, {title: text});
        });
        this.inform();
    }

    public clearCompleted() {
        this.todos = this.todos.filter((todo) => {
            return !todo.completed;
        });
        this.inform();
    }
}
