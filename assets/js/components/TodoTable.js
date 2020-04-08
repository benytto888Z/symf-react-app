import React, {Component, useContext} from 'react';
import {TodoContext} from "../contexts/TodoContext";

function TodoTable() {
        const context = useContext(TodoContext);
        return (

                <div>{context.todos.map(todo=>(
                    <div>{todo.name}</div>
                ))}</div>

        );
}

export default TodoTable;