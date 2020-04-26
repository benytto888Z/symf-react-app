import React, {useContext} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog(props) {

    const hide = ()=>{
        props.setDeleteConfirmationIsShown(false);
    }
    const context = useContext(TodoContext);
        return (
           <Dialog fullWidth={true} maxWidth='sm' open={props.open}>
                <DialogTitle>Êtes vous sûr de vouloir supprimer ? </DialogTitle>
               <DialogContent>
                  {props.todoToDelete.task}
               </DialogContent>
               <DialogActions>
                   <Button onClick={hide}>Annuler</Button>
                   <Button onClick={
                       ()=>{
                           context.deleteTodo(props.todoToDelete.id);
                            hide();
                         }
                   }>
                       Supprimer
                   </Button>
               </DialogActions>
           </Dialog>
        );
}

export default DeleteDialog;