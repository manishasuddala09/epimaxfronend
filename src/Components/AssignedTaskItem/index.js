import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import AssignedTaskItem from '../AssignedTaskItem';

const taskDtailstList = JSON.parse(localStorage.getItem('taskDetails'));

class AssignTaskPage extends Component {
    state = {tasksList: taskDtailstList}

    render() {
        const {tasksList} = this.state;

        return(
            <div className='assigned-task-bg'>
                <Link to="/home">
                    <button type="button" className="back-btn">
                        Back
                    </button>
                </Link>
                <h1 className="assignrd-page-heading">Assigned Tasks</h1>
                <div className="headings-part">
                    <h2 className="titles">Task Title</h2>
                    <h2 className="titles">Assigned To</h2>
                </div>
                <ul className="task-list">
                    {tasksList.map((eachTask) =>(
                        <AssignedTaskItem key={eachTask.id} taskItemDetails={eachTask} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default AssignTaskPage;