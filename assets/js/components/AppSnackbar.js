import React, {Component, Fragment, useContext} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import {TodoContext} from "../contexts/TodoContext";
import {Button} from "@material-ui/core";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function checkLevel(level) {
switch (level) {
    case 'success':
        return 'green';
    case 'error':
        return 'red';
    default:
        return 'white';
}
}

function AppSnackbar () {
const context = useContext(TodoContext);
        return (
            <Snackbar autoHideDuration={6000} open={context.message.text !==undefined}>

                {context.message.text && (
                    <SnackbarContent
                        style = {{backgroundColor: checkLevel(context.message.level), whiteSpace:'pre'}}
                        message={context.message.text}
                        action = {[
                        <Button key='dismiss'
                                color='inherit'
                                onClick={()=>{context.setMessage({})}}
                        >fermer
                        </Button>
                    ]}/>
                )}
            </Snackbar>
        );
}

export default AppSnackbar;