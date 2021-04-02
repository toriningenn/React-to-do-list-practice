import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TODOApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ['kek', 'puk', 'lol'],
            doneTasks: ['aaa', 'ffff', 'ggg'],
        }
        this.addNewTask = this.addNewTask.bind(this);
        this.deleteThisTask = this.deleteThisTask.bind(this);
        this.moveTaskToDone = this.moveTaskToDone.bind(this);
    }

    addNewTask(task) {
        this.setState({tasks: this.state.tasks.concat(task)})
    };

    deleteThisTask(taskIndex, arr, listName) {
        const newArr = [...arr]
        newArr.splice(taskIndex, 1)
        if (listName === 'done') {
            this.setState({doneTasks: newArr})
        } else {
            this.setState({tasks: newArr})
        }
    }

    moveTaskToDone(taskIndex) {
        const newArr = [...this.state.doneTasks];
        const task = this.state.tasks[taskIndex];
        this.deleteThisTask(taskIndex, this.state.tasks, 'todo')
        newArr.push(task);
        this.setState({doneTasks: newArr});
    }

    render() {
        return (
            <div>
                <Tasks todoList={this.state.tasks}
                       doneList={this.state.doneTasks}
                       deleteFunc={this.deleteThisTask}
                       moveFunc={this.moveTaskToDone}/>
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
                <ol className="TasksList">
                    {this.props.todoList.map(task => (<div>
                        <ul>{task}</ul>
                        <DoneButton
                            moveToDone={() =>
                                this.props.moveFunc(this.props.todoList.indexOf(task))}/>
                        <DeleteButton
                            value={() => this.props.deleteFunc(
                                this.props.todoList.indexOf(task),
                                this.props.todoList, 'todo'
                            )}/>
                    </div>))}
                </ol>
                <div><h1>Done:</h1>
                    <ol className="DoneList">
                        {this.props.doneList.map(task => (<div>
                            <ul><s>{task}</s></ul>
                            <DoneButton
                                moveToDone={() =>
                                    this.props.moveFunc(this.props.todoList.indexOf(task))}/>
                            <DeleteButton
                                value={() => this.props.deleteFunc(
                                    this.props.doneList.indexOf(task),
                                    this.props.doneList, 'done'
                                )}/>
                        </div>))}
                    </ol>
                </div>
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
        this.props.moveToDone();
    }

    render() {
        return (
            <button onClick={this.clickHandler}>{this.state.done ? 'X' : '✓'}</button>
        );
    }
}

function DeleteButton(props) {
    return <button onClick={props.value}>&#9746;</button>;
}


ReactDOM.render(
    <TODOApp/>,
    document.getElementById('root')
);