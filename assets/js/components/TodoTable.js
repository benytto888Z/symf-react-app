import React, {Component, Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import DeleteDialog from "./DeleteDialog";
import Typography from "@material-ui/core/Typography";

function TodoTable() {

        const context = useContext(TodoContext);
        const [addTodo,setAddTodo]=useState('');
        const [addTodoDescription, setAddTodoDescription] = useState('');
        const [editIsShown,setEditIsShown]=useState(false);
        const [editTodo,setEditTodo]=useState('');
        const [editTodoDescription, setEditTodoDescription] = useState('');
        const [deleteConfirmationIsShown,setDeleteConfirmationIsShown]=useState(false);
        const [todoToDelete,setTodoToDelete]=useState(null);
        const onCreateSubmit = (e)=>{
            e.preventDefault();
            context.createTodo(e,{task:addTodo,description: addTodoDescription});
            setAddTodo('');
            setAddTodoDescription('');
        };

        const onEditSubmit = (id)=>{
            //e.preventDefault();
           //console.log(editTodo,id);
            context.updateTodo({id,task:editTodo,description: editTodoDescription});
            setEditIsShown(false);
        };

        return (
            <Fragment>

                <Table>
                        <TableHead>
                                <TableRow className="rowHeadColor">
                                    <TableCell className="rowCellHColor" >ID</TableCell>
                                    <TableCell className="rowCellHColor">Tâche</TableCell>
                                    <TableCell className="rowCellHColor">Description</TableCell>
                                    <TableCell align="right" className="rowCellHColor">Actions</TableCell>
                                </TableRow>
                        </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <form onSubmit={onCreateSubmit}>
                                <TextField type="text" onChange={(e)=>setAddTodo(e.target.value)} value={addTodo} label="Nouvelle tâche" fullWidth={true}/>
                                </form>
                                </TableCell>

                            <TableCell>
                                <form>
                                    <TextField type="text" value={addTodoDescription} onChange={(event) => {
                                        setAddTodoDescription(event.target.value);
                                    }} label="Description" fullWidth={true} multiline={true}/>
                                </form>
                            </TableCell>

                            <TableCell align="right">
                                <IconButton onClick={onCreateSubmit}>
                                    <AddIcon/>
                                </IconButton>

                            </TableCell>

                        </TableRow>
                        {/*DATA*/}
                        {context.todos.slice().reverse().map((todo,index)=>(
                            <TableRow key={'todo'+index}>
                                <TableCell>{todo.id}</TableCell>
                                {/*TASK*/}
                                <TableCell>

                                    {
                                        editIsShown === todo.id ?
                                            <form onSubmit={()=>{onEditSubmit(todo.id)}}>
                                            <TextField type="text" value={editTodo}
                                                       onChange={(event =>
                                                setEditTodo(event.target.value))}
                                            fullWidth={true}
                                                       autoFocus={true}
                                            />
                                            </form>
                                            :
                                            <Typography>{todo.task}</Typography>
                                    }

                                </TableCell>

                                {/*DESCRIPTION*/}
                                <TableCell>
                                    {editIsShown === todo.id ?
                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            value={editTodoDescription}
                                            onChange={(event) => setEditTodoDescription(event.target.value)}
                                            multiline={true}
                                        />
                                        :
                                        <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                    }
                                </TableCell>


                                <TableCell align="right">
                                    {editIsShown === todo.id ?
                                        <Fragment>
                                            <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                                                <DoneIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => setEditIsShown(false)}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IconButton onClick={() => {
                                                setEditIsShown(todo.id);
                                                setEditTodo(todo.task);
                                                setEditTodoDescription(todo.description);
                                            }}>

                                                <EditIcon/>

                                            </IconButton>

                                            <IconButton onClick={() => {
                                                setDeleteConfirmationIsShown(true);
                                                setTodoToDelete(todo);
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Fragment>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


                { deleteConfirmationIsShown && (
                    <DeleteDialog open={deleteConfirmationIsShown}
                                  setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                                  todoToDelete={todoToDelete}
                    />
                    )
                }

            </Fragment>
        );
}

export default TodoTable;