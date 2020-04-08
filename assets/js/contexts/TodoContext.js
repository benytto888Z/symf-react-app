import React, {Component, createContext} from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor() {
        super();
        this.state = {
            todos:[
                {name: 'Faire quelque chose'},
                ],
        };
    }

    //create
    createTodo(){

    }
    //read
    readTodo(){

    }
    //update
    updateTodo(){

    }
    //delete
    deleteTodo(){

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                readTodo: this.readTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;