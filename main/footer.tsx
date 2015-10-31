/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./interfaces.d.ts" />

import {Utils} from "./utils"; // exporting one class
import * as constants from "./constants"; // exporting multi val
import * as React from "react";
import * as classNames from "classnames";

import Element = JSX.Element; // alias


export class TodoFooter extends React.Component<ITodoFooterProps, {}> {
    public render(): Element {
        let activeTodoWord: string = Utils.pluralize(this.props.count, 'item');
        let clearButton: Element = null;
        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleter}>
                    Clear completed
                </button>
            );
        }
        // React idiom for shortcutting to `classSet` since it'll be used often
        let cx = classNames;
        let nowShowing: string = this.props.nowShowing;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong>
                    {activeTodoWord} left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href="#/"
                            className={cx({selected: nowShowing === constants.ALL_TODOS})}>
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/active"
                            className={cx({selected: nowShowing === constants.ACTIVE_TODOS})}>
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/completed"
                            className={cx({selected: nowShowing === constants.COMPLETED_TODOS})}>
                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}
