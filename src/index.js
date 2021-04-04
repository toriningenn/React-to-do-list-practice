import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const todo = 'todo';
const done = 'done';
const stateKey = 'state';

class TODOApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ['kek', 'puk', 'lol', 'lkgl', 'wtf'],
            doneTasks: [],
        }
        this.addNewTask = this.addNewTask.bind(this);
        this.deleteThisTask = this.deleteThisTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
        this.fromLocalStorage = this.fromLocalStorage.bind(this);
    }


    componentDidUpdate() {
        localStorage.setItem(stateKey, JSON.stringify(this.state));
        console.log(this.state);
    }

    fromLocalStorage() {
        return JSON.parse(localStorage.getItem(stateKey));
    }

    componentDidMount() {
        const stateObject = this.fromLocalStorage();
        if (stateObject) {
            this.setState(stateObject);
        }
    }

    addNewTask(task) {
        if (task) {
            this.setState({tasks: this.state.tasks.concat(task)})
        }
    };

    deleteThisTask(taskIndex, arr, listName) {
        const newArr = [...arr]
        newArr.splice(taskIndex, 1)
        if (listName === done) {
            this.setState({doneTasks: newArr})
        } else {
            this.setState({tasks: newArr})
        }
    }

    moveTask(taskIndex, from, to, fromListName) {
        let newArr = [...to];
        let task = from[taskIndex];
        newArr.push(task);
        this.deleteThisTask(taskIndex, from, fromListName);
        if (to === this.state.tasks) {
            this.setState({tasks: newArr});
        } else {
            this.setState({doneTasks: newArr});
        }
    }

    render() {
        return (
            <div>
                <Tasks todoList={this.state.tasks}
                       doneList={this.state.doneTasks}
                       deleteFunc={this.deleteThisTask}
                       moveFunc={this.moveTask}/>
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
        this.setState({newTask: ''});
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <label>Новая задача:</label>
                <input id="task" value={this.state.newTask} type="text" onChange={this.changeHandler}/>
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
                        <ul className="taskName">
                            <DoneButton
                                move={() =>
                                    this.props.moveFunc(this.props.todoList.indexOf(task),
                                        this.props.todoList, this.props.doneList, todo)}
                                look={'✓'}/>
                            {task}
                            <DeleteButton
                                value={() => this.props.deleteFunc(
                                    this.props.todoList.indexOf(task),
                                    this.props.todoList, todo
                                )}/></ul>
                    </div>))}
                </ol>
                <div><h1>Done:</h1>
                    <ol className="DoneList">
                        {this.props.doneList.map(task => (<div>
                            <ul className="taskName">
                                <DoneButton
                                    move={() =>
                                        this.props.moveFunc(this.props.doneList.indexOf(task),
                                            this.props.doneList, this.props.todoList, done)}
                                    look={'X'}/>
                                <s>{task}</s>
                                <DeleteButton
                                    value={() => this.props.deleteFunc(
                                        this.props.doneList.indexOf(task),
                                        this.props.doneList, done
                                    )}/></ul>
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
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(event) {
        event.preventDefault();
        this.props.move();
    }

    render() {
        return (
            <button className="donebutton" onClick={this.clickHandler}>{this.props.look}</button>
        );
    }
}

function DeleteButton(props) {
    return <button className="deletebutton" onClick={props.value}>&#9746;</button>;
}


ReactDOM.render(
    <TODOApp/>,
    document.getElementById('root')
);