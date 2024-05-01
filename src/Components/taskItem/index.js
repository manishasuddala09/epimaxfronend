import React from 'react'
import { MdDelete } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import './index.css'


const TaskItem = ({taskItemDetails, onTaskClick, onTaskDelete, onTaskUpdate}) => {
    const {id, title, mode, teamSize} = taskItemDetails

    const handleClick = () => {
        onTaskClick(taskItemDetails);
    };

    const handleDelete = () => {
        onTaskDelete(id);
    }

    const handleUpdate = () => {
        onTaskUpdate(taskItemDetails);
    }

    return (
        <li className='task-card'>
            <IoMdOpen style={{fontSize: '14px', color:'black', marginLeft:'auto'}} onClick={handleClick} />
            <div className='title-status-container'>
           <h1 className='card-heading'>{title}</h1>
           <p className='card-heading'>Status: {mode}</p> 
           </div>
           <p className='card-heading'>Team Name: {teamSize}</p>
           <div className='buttons-container'>
            <button type="button" className='update-btn' onClick={handleUpdate}>Update</button>
            <MdDelete className="del-icon" onClick={handleDelete} />
           </div>
        </li>
    )
}

export default TaskItem