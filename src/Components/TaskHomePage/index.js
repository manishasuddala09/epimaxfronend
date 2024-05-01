import React, { Component } from 'react';
import './index.css';
import Navbar from '../Sidebar';
import NavbarSm from '../MobileSidebar';
import TaskItem from '../taskItem';
import SummaryPage from '../TaskSummaryPage';

class TaskHomePage extends Component {
    constructor(props) {
        super(props);
        const storedTasks = localStorage.getItem('taskDetails');
        const defaultTasks = [
            {
                id: 1,
                title: 'project 1',
                description: 'this project is about to display the list of tasks of user',
                teamSize: 1,
                mode: 'Start'
            },
            {
                id: 2,
                title: 'project 2',
                description: 'this project is about to display the list of tasks of user',
                teamSize: 1,
                mode: 'End'
            }
        ];

        this.state = {
            isAddingTask: false,
            isUpdatingTask: false,
            taskTitle: '',
            taskDescription: '',
            teamSize: '',
            taskMode: '', // Default mode
            taskDetails: storedTasks ? JSON.parse(storedTasks) : defaultTasks,
            errors: {
                title: '',
                description: '',
                teamSize: ''
            },
            filteredTasks: [], // To store tasks based on the selected mode
            isSelectTask: false,
            selectedTask: '',
            successMessage: '',
        };
    }

    componentDidMount() {
        this.setState({ filteredTasks: this.state.taskDetails });
    }

    saveTasksToLocalStorage = () => {
        localStorage.setItem('taskDetails', JSON.stringify(this.state.taskDetails));
    };

    handleAddTaskClick = () => {
        this.setState({ isAddingTask: true });
    };

    handleUpdateTaskClick = (task) => {
        this.setState({
            isUpdatingTask: true,
            taskTitle: task.title,
            taskDescription: task.description,
            teamSize: task.teamSize,
            taskMode: task.mode,
            selectedTask: task,
        });
    };

    handleCancelClick = () => {
        this.setState({
            isAddingTask: false,
            isUpdatingTask: false,
            taskTitle: '',
            taskDescription: '',
            teamSize: '',
            taskMode: '',
            errors: {
                title: '',
                description: '',
                teamSize: ''
            }
        });
    };

    handleSaveClick = () => {
        const { taskTitle, taskDescription, teamSize, taskMode, taskDetails, isUpdatingTask, selectedTask } = this.state;
        const errors = {};

        if (!taskTitle.trim()) {
            errors.title = '*Task title cannot be empty!';
        }

        if (taskDescription.split(/\s+/).length > 100) {
            errors.description = '*Task description should have maximum 100 words!';
        }

        if (!teamSize.trim()) {
            errors.teamSize = '*Team name should not be empty!';
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        const newTask = {
            id: isUpdatingTask ? selectedTask.id : taskDetails.length + 1,
            title: taskTitle,
            description: taskDescription,
            teamSize: teamSize,
            mode: taskMode
        };

        const updatedTaskDetails = isUpdatingTask
            ? taskDetails.map(task => (task.id === selectedTask.id ? newTask : task))
            : [...taskDetails, newTask];

        this.setState({
            taskDetails: updatedTaskDetails,
            isAddingTask: false,
            isUpdatingTask: false,
            taskTitle: '',
            taskDescription: '',
            teamSize: '',
            taskMode: '',
            errors: {
                title: '',
                description: '',
                teamSize: ''
            },
            successMessage: isUpdatingTask ? 'Your task is updated successfully' : 'Your task is added successfully',
        }, () => {
            localStorage.setItem('taskDetails', JSON.stringify(updatedTaskDetails));
            this.updateFilteredTasks(updatedTaskDetails, taskMode); 
        });

        // Clear success message after a delay
        setTimeout(() => {
            this.setState({ successMessage: '' });
        }, 3000);
    };

    updateFilteredTasks = (tasks, mode) => {
        if (mode === '') {
            // If mode is empty, show all tasks
            this.setState({ filteredTasks: tasks });
        } else {
            // Otherwise, filter tasks by mode
            const filteredTasks = tasks.filter(task => task.mode === mode);
            this.setState({ filteredTasks });
        }
    };

    handleDeleteTask = (taskId) => {
        const updatedTaskDetails = this.state.taskDetails.filter(task => task.id !== taskId);
        this.setState({ taskDetails: updatedTaskDetails, successMessage: 'Your task is deleted successfully' }, () => {
            this.saveTasksToLocalStorage(); // Save updated task details to local storage
        });
        console.log('task deleted');
    };

    handleModeButtonClick = (mode) => {
        this.setState({ taskMode: mode }, () => {
            // Filter tasks based on mode
            if (mode === '') {
                // If mode is empty, show all tasks
                this.setState({ filteredTasks: this.state.taskDetails });
            } else {
                // Otherwise, filter tasks by mode
                const filteredTasks = this.state.taskDetails.filter(task => task.mode === mode);
                this.setState({ filteredTasks });
            }
        });
    };

    handleTaskClick = (task) => {
        console.log(task);
        this.setState({ selectedTask: task, isSelectTask: true });
    };

    onClickBack = () => {
        this.setState({
            isSelectTask: false,
        })
    }

    renderTaskHome = () => {
        const { isAddingTask, taskTitle, taskDescription, taskMode, teamSize, errors, filteredTasks, isUpdatingTask, successMessage } = this.state;

        return (
            <div className='home-bg'>
                <div className="lg-m-devices-navnar">
                    <Navbar />
                </div>
                <div className='sm-devices-navbar'>
                    <NavbarSm />
                </div>
                <div className='home-content-part'>
                    <h1 className='tasks-heading'>Tasks</h1>
                    <div className='tabs-container'>
                        <button type="button" className='tab-btn' onClick={() => this.handleModeButtonClick('')}>All</button>
                        <button type="button" className='tab-btn' onClick={() => this.handleModeButtonClick('Start')}>Start</button>
                        <button type="button" className='tab-btn' onClick={() => this.handleModeButtonClick('End')}>End</button>
                        <button type="button" className='tab-btn' onClick={() => this.handleModeButtonClick('Complete')}>Complete</button>
                    </div>
                    <div className='tasks-container'>
                        <ul className="task-items-list">
                            {filteredTasks.map((eachTask) => (
                                <TaskItem key={eachTask.id} taskItemDetails={eachTask} onTaskClick={this.handleTaskClick} onTaskDelete={this.handleDeleteTask} onTaskUpdate={this.handleUpdateTaskClick} />
                            ))}
                        </ul>
                    </div>
                    {isAddingTask || isUpdatingTask ? (
                        <div className='task-form'>
                            <div className="form-group">
                                <label htmlFor="taskTitle">Task Title</label>
                                <input type="text" id="taskTitle" value={taskTitle} className='task-title-input' onChange={e => this.setState({ taskTitle: e.target.value })} />
                                {errors.title && <span className="error">{errors.title}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDescription">Task Description</label>
                                <textarea id="taskDescription" value={taskDescription} className='task-title-input' onChange={e => this.setState({ taskDescription: e.target.value })} />
                                {errors.description && <span className="error">{errors.description}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="teamSize">Team Name</label><br/>
                                <input type="text" id="teamSize" value={teamSize} className='team-size-input' onChange={e => this.setState({ teamSize: e.target.value })} />
                                {errors.teamSize && <span className="error">{errors.teamSize}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskModeDropDown">Task Mode</label><br/>
                                <select id="taskModeDropDown" value={taskMode} className="dropdown" onChange={e => this.setState({ taskMode: e.target.value })}>
                                    <option value="Start">Start</option>
                                    <option value="End">End</option>
                                    <option value="Complete">Complete</option>
                                </select>
                            </div>
                            <button type="button" className="form-btns" onClick={this.handleSaveClick}>Save</button>
                            <button type="button" className="form-btns" onClick={this.handleCancelClick}>Cancel</button>
                        </div>
                    ) : (
                        <button type="button" className='add-btn' onClick={this.handleAddTaskClick}>Add Task</button>
                    )}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
            </div>
        );
    }

    render() {
        const { isSelectTask, selectedTask } = this.state;

        return isSelectTask ? <SummaryPage task={selectedTask} onClickBack={this.onClickBack}/> : this.renderTaskHome()
    }
}

export default TaskHomePage;