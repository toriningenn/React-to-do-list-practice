import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TODOApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksTodo: ['kek', 'puk'],
            tasksDone: ['lol', 'done'],
            checked: [],
        }
        this.addNewTask = this.addNewTask.bind(this);
    }

    addNewTask(task) {
        this.setState({tasksTodo: this.state.tasksTodo.concat(task)})
    };

    moveToDone(i) {
        let doneTask = this.tasksTodo(i);
        this.setState({tasksTodo: this.state.tasksTodo.splice(i)})
        this.setState({tasksDone: this.state.tasksDone.concat(doneTask)})
    };

render()
{
    return (
        <div>
            <ToDos value={this.state.tasksTodo}/>
            <Done value={this.state.tasksDone}/>
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

class Done extends React.Component {
    render() {
        return (
            <div><h1>Done:</h1>
                <ol className="DoneList">
                    {this.props.value.map(done => <li>{done}</li>)}
                </ol>
            </div>
        );
    }
}

class ToDos extends React.Component {
    render() {
        return (
            <div><h1>To-do:</h1>
                <ol className="To-do">
                    {this.props.value.map(todo => <li>{todo}</li>)}
                </ol></div>
        );
    }
}

class MyCheckbox extends React.Component {
    getCheckedIndex() {

    }
    render () {
        return (
            <input type="checkbox" checked={this.getCheckedIndex()}/>
        );
    }
}
class DeleteButton extends React.Component {
    render () {
        return (
            <button>Удалить</button>
        );
    }
}


ReactDOM.render(
    <TODOApp/>,
    document.getElementById('root')
);