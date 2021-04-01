import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TODOApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ['kek', 'puk', 'lol'],
        }
        this.addNewTask = this.addNewTask.bind(this);
        this.deleteThisTask=this.deleteThisTask.bind(this);
    }

    addNewTask(task) {
        this.setState({tasks: this.state.tasks.concat(task)})
    };

    deleteThisTask(taskIndex) {
        const newArr = [...this.state.tasks]
        newArr.splice(taskIndex,1)
        this.setState({tasks: newArr})
    }

    render() {
        return (
            <div>
                <Tasks value={this.state.tasks} deleteFunc={this.deleteThisTask}/>
                <MyForm value={this.addNewTask}/>
            </div>
        );
    }
}


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: '',
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(event) {
        this.setState({newTask: event.target.value});
    }

    submitHandler(event) {
        event.preventDefault();
        this.props.value(this.state.newTask);
        document.getElementById('task').value = '';
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <label>Новая задача:</label>
                <input id="task" type="text" onChange={this.changeHandler}/>
                <input type="submit"/>
            </form>
        );
    }
}

class Tasks extends React.Component {

    render() {
        return (
            <div><h1>Tasks:</h1>
                <ol className="DoneList">
                    {this.props.value.map(task => (<div>
                        <ul>{task}</ul>
                        <DoneButton/>
                        <DeleteButton value={() => this.props.deleteFunc(this.props.value.indexOf(task))}/>
                    </div>))}
                </ol>
            </div>
        );
    }
}



class DoneButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
        }
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(event) {
        event.preventDefault();
        this.setState({done: !this.state.done});
    }

    render() {
        return (
            <button onClick={this.clickHandler}>{this.state.done ? '✓' : 'X'}</button>
        );
    }
}

function DeleteButton (props) {
    return <button onClick={props.value}>&#9746;</button>;
}




ReactDOM.render(
    <TODOApp/>,
    document.getElementById('root')
);