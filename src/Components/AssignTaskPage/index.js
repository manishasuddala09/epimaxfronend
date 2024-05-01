import React from 'react';
import './index.css'

const AssignedTaskItem = props => {
    const {taskItemDetails} = props;
    const {title, teamSize} = taskItemDetails;

    return(
        <li className='assigned-task-list-item'>
            <p className='title'>{title}</p>
            <p className='title'>{teamSize}</p>  
        </li>
    )
}

export default AssignedTaskItem