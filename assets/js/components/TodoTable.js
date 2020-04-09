import React, {Component, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

function TodoTable() {
        const context = useContext(TodoContext);
        const [addTodo,setAddTodo]=useState('');
        return (
            <form onSubmit={(e)=>{
                context.createTodo(e,{name:addTodo});
                setAddTodo('');
            }}>
                <Table>
                        <TableHead>
                                <TableRow>
                                    <TableCell>Tâche</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                        </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell >
                                <TextField onChange={(e)=>setAddTodo(e.target.value)} value={addTodo} label="Nouvelle tâche" fullWidth={true}/>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>

                        </TableRow>

                        {context.todos.slice().reverse().map((todo,index)=>(
                            <TableRow key={'todo'+index}>
                                <TableCell>{todo.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton> <EditIcon/></IconButton>
                                    <IconButton> <DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
        );
}

export default TodoTable;