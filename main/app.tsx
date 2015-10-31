/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./typings/director.d.ts" />
/// <reference path="./interfaces.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router} from "director";
import {TodoItem} from "./todoItem";
import {TodoFooter} from "./footer";
import {TodoModel} from "./todoModel";
import * as constants from "./constants";

export default class TodoApp extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            nowShowing: constants.ALL_TODOS,
            editing: null
        }
    }

    public componentDidMount() {
        let setState = this.setState;
        // we will configure the Router here
        // our router is provided by the director npm module
        // the router observes changes in the URL and triggers some component's event accordingly
        let router = new Router({
            '/': setState.bind(this, {nowShowing: constants.ALL_TODOS}),
            '/active': setState.bind(this, {nowShowing: constants.ACTIVE_TODOS}),
            '/completed': setState.bind(this, {nowShowing: constants.COMPLETED_TODOS})
        });
        router.init(`/`);
    }

    public handleNewTodoKeyDown(event) {
        if (event.keyCode !== constants.ENTER_KEY) {
            return;
        }

        event.preventDefault();

        let val = ReactDOM.findDOMNode<HTMLInputElement>(this.refs[`newField`]).value.trim();

        if (val) {
            this.props.model.addTodo(val);
            ReactDOM.findDOMNode<HTMLInputElement>(this.refs[`newField`]).value = ``;
        }
    }

    public toggleAll(event) {
        let checked = event.target.checked;
        this.props.model.toggleAll(checked);
    }

    public toggle(todoToToggle) {
        this.props.model.toggle(todoToToggle);
    }

    public destroy(todo) {
        this.props.model.destroy(todo);
    }

    public edit(todo) {
        this.setState({editing: todo.id});
    }

    public save(todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    }

    public cancel() {
        this.setState({editing: null});
    }

    public clearCompleted() {
        this.props.model.clearCompleted();
    }

    public render() {
        let footer;
        let main;
        let todos = this.props.model.todos;

        let shownTodos = todos.filter(function (todo) {
            switch (this.state.nowShowing) {
                case constants.ACTIVE_TODOS:
                    return !todo.completed;
                case constants.COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        }, this);

        let todoItems = shownTodos.map(function (todo) {
            return (
                <TodoItem key={todo.id} todo={todo}
                          onToggle={this.toggle.bind(this, todo)}
                          onDestroy={this.destroy.bind(this, todo)}
                          onEdit={this.edit.bind(this, todo)}
                          editing={this.state.editing === todo.id}
                          onSave={this.save.bind(this, todo)}
                          onCancel={ e => this.cancel() }
                />
            );
        }, this);

        let activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        let completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer = <TodoFooter
                count={activeTodoCount}
                completedCount={completedCount}
                nowShowing={this.state.nowShowing}
                onClearCompleter={ e=> this.clearCompleted() }
            />;
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        onChange={ e => this.toggleAll(e) }
                        checked={activeTodoCount === 0}
                    />
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        ref="newField"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={ e => this.handleNewTodoKeyDown(e) }
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
}

let model = new TodoModel('react-todos');

let render = () => {
    ReactDOM.render(
        <TodoApp model={model}/>,
        document.getElementsByClassName('todoapp')[0]
    );
};

model.subscribe(render);
render();
