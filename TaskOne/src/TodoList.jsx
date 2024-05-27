import React, { Component } from 'react';
import './TodoList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';
import { Alert } from 'react-bootstrap';
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTask: '',
        };
    }

    handleInputChange = (e) => {
        this.setState({ newTask: e.target.value });
    };

    addTask = () => {
        const { newTask, tasks } = this.state;
        if (newTask.trim() !== '') {
            this.setState({
                tasks: [...tasks, { id: String(Date.now()), text: newTask, done: false }],
                newTask: '',
            });
        }
    };

    markAsDone = (id) => {
        const { tasks } = this.state;
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        );
        this.setState({ tasks: updatedTasks });
    };

    removeTask = (id) => {
        const { tasks } = this.state;
        const updatedTasks = tasks.filter((task) => task.id !== id);
        this.setState({ tasks: updatedTasks });
    };

    renderEmptyText = () => {
        const { tasks } = this.state;
        const totalTasks = tasks.length;
        const doneTasks = tasks.filter(task => task.done).length;

        if (totalTasks === 0) {
            return (
                <>
                    <h1>Set Your Goals Now !!</h1>
                    <h5>If you don't know where you are going you'll end up someplace else</h5>
                </>
            );
        } else if (doneTasks === 0) {
            return (
                <>
                    <h5>Setting goals is the first step in turning the invisible into the visible</h5>
                </>
            );
        } else if (doneTasks === totalTasks / 4) {
            return <h5>Move on, for every step forward brings you closer to your goal</h5>
        } else if (doneTasks === totalTasks / 2) {
            return (
                <h5>
                    Congratulations on reaching the halfway mark! Your dedication and perseverance have brought you
                    this far. Remember, the road ahead may have challenges, but your determination will guide you through. Keep
                    pushing forward, for greatness awaits at the finish line
                </h5>
            );
        } else if (doneTasks === 3 * totalTasks / 4) {
            return (
                <h5>
                    You've come so far, achieving three-quarters of your goal! Take a moment to celebrate your
                    progress and reflect on how much you've accomplished. As you enter the final stretch, let your
                    determination fuel your drive. Keep pushing forward with unwavering resolve, for victory is within
                    your grasp.
                </h5>
            );
        } else if (doneTasks === totalTasks) {
            return <>
               <Alert variant="success">
                    <Alert.Heading>Congratulations on reaching your target!</Alert.Heading>
                </Alert>
                <h5>
                    Your dedication and hard work have paid off splendidly. Take pride in this accomplishment and
                    relish the moment. Tomorrow brings new opportunities and challenges, and I have every confidence
                    that you'll tackle them with the same fervor and determination.
                    <br></br><b>Keep aiming high and exceeding expectations!</b>
                </h5>
            </>
        } else {
            return <h5>Today's target is tomorrow's achievement. Embrace your tasks with determination, for each
                step forward is a step closer to your goals</h5>
        }
    };

    render() {
        const { tasks, newTask } = this.state;
        const completedTasks = tasks.filter(task => task.done);
        const uncompletedTasks = tasks.filter(task => !task.done);

        return (
            <>
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <div className="todo-list">
                            <h1 style={{ fontSize: "25px" }}>Set Your New Goals</h1>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Enter a task"
                                    value={newTask}
                                    onChange={this.handleInputChange}
                                />
                                <button onClick={this.addTask} className='custom-button'>Add Goal</button>
                            </div>
                            <ul className='mt-5 custom-ul'>
                                {uncompletedTasks.map((task) => (
                                    <li key={task.id} className={task.done ? 'done' : ''}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                value={task.text}
                                                readOnly
                                                onClick={() => this.markAsDone(task.id)}
                                            />

                                            <UseAnimations
                                                animation={trash2}
                                                size={40}
                                                onClick={() => this.removeTask(task.id)}

                                            />

                                        </div>
                                    </li>
                                ))}
                                {completedTasks.map((task) => (
                                    <li key={task.id} className={task.done ? 'done' : ''}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                value={task.text}
                                                readOnly
                                                onClick={() => this.markAsDone(task.id)}
                                                style={{backgroundColor : '#c3c3c3'}}
                                            />

                                            <UseAnimations
                                                animation={trash2}
                                                size={40}
                                                onClick={() => this.removeTask(task.id)}
                                                className="icon"
                                            />

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mt-5 mr-3">
                    <div className="text-content">
                        {this.renderEmptyText()}
                    </div>
                    </div>
                </div>
            </>
        );
    }
}

export default TodoList;
