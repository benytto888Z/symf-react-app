import React, {Component, createContext} from 'react';
import axios from 'axios';
export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor() {
        super();
        this.state = {
            todos:[],
            message:{}
        };
    }

    componentDidMount(){
        this.readTodo();
    }
    //create
     createTodo(e,todo){
        e.preventDefault();
       axios.post('/api/todo/create',todo)
           .then(response=>{

                if(response.data.message.level === 'success'){
                    console.log(response.data.todo);
                    let datas = [...this.state.todos,response.data.todo];
                    // data.push(todo);
                    this.setState({
                        todos:datas,
                        message : response.data.message,
                    })}
                    else{
                        this.setState({message:response.data.message})
                    }

           }).catch(error=>{
               console.error(error);
       });
    };
    //read
    readTodo(){
        axios.get('/api/todo/read')
            .then(response=>{
           // console.log(response.data);
                this.setState({
                    todos:response.data
                })
        }).catch(error=>{
            console.error(error);
        })

    }
    //update
    updateTodo(data){
         axios.put("/api/todo/update/" + data.id, data)
            .then(response => {
                if (response.data.message.level === 'error'){
                    this.setState({
                        message: response.data.message,
                    })
                } else {
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                        return todo.id === data.id
                    });
                    todo.task = response.data.todo.task;
                    todo.description =  response.data.todo.description;
                    this.setState({
                        todos: todos,
                        message:response.data.message
                    })
                }
            }).catch(error => {
            console.error(error);
        });
    }
    //delete
    deleteTodo(taskId){
        axios.delete('/api/todo/delete/' +taskId)
            .then(response=>{
                if (response.data.message.level === 'error'){
                    this.setState({
                        message: response.data.message,
                    })
                } else {
                    let todos = this.state.todos.filter(todo => {
                        return (
                            todo.id !== taskId
                        )
                    });
                    this.setState({
                        todos: todos,
                        message:response.data.message
                    })
                }
            }).catch(error=>{
            console.error(error);
        })

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                readTodo: this.readTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message)=>this.setState({message:message})
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}
export default TodoContextProvider;