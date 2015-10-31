// defines the interface of the structure of a task
interface ITodo {
    id: string;
    title: string;
    completed: boolean;
}

// defines the interface of the properties of the TodoItem component
interface ITodoItemProps {
    key: string;
    todo: ITodo;
    // ? == optional
    editing? : boolean;
    onSave: (val: any) => void;
    onDestroy: () => void;
    onEdit: () => void;
    onCancel: (event: any) => void;
    onToggle: () => void;
}

// defines the interface of the state of the TodoItem component
interface ITodoItemState {
    editText: string;
}

// defines the interface of the properties of the Footer component
interface ITodoFooterProps {
    completedCount: number;
    onClearCompleter: any;
    nowShowing: string;
    count: number;
}

// defines the TodoModel interface
interface ITodoModel {
    key: any;
    todos: ITodo[];
    onChanges: any[];
    subscribe(onchange);
    inform();
    addTodo(title: string);
    toggleAll(checked);
    toggle(todoToToggle);
    destroy(todo);
    save(todoToSave, text);
    clearCompleted();
}

// Defines the interface of the properties of the App component
interface IAppProps {
    model : ITodoModel;
}

// Defines the interface of the state of the App component
interface IAppState {
    editing? : string;
    nowShowing? : string
}
