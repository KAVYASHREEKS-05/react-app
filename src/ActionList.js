import React from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { FaFlag } from "react-icons/fa";

const ActionList = ({ spriteIndex, actions, setActions }) => {
    const handleDrop = (e) => {
        e.preventDefault();
        const action = JSON.parse(e.dataTransfer.getData('action'));
        setActions((prevActions) => {
            const newActions = [...prevActions];
            newActions[spriteIndex] = [...(newActions[spriteIndex] || []), action];
            return newActions;
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDeleteAction = (actionIndex) => {
        setActions((prevActions) => {
            const newActions = [...prevActions];
            if (newActions[spriteIndex]) {
                newActions[spriteIndex].splice(actionIndex, 1);
            }
            return newActions;
        });
    };

    return (
        <div className="action-list" onDrop={handleDrop} onDragOver={handleDragOver}>
            <h3 className='heading-action'><FaFlag /> Actions</h3>
            <h4 className="action-list-header">Actions {spriteIndex + 1}</h4>
            <ul className="action-items">
                {(actions[spriteIndex] || []).length === 0 ? (
                    <li className="no-actions">No actions available</li>
                ) : (
                    (actions[spriteIndex] || []).map((action, index) => (
                        <li key={index} className="action-item">
                            <span className="action-description">
                                {action.type} {action.value ? (typeof action.value === 'object' ? `(${action.value.x}, ${action.value.y})` : action.value) : ''}
                            </span>
                            <button onClick={() => handleDeleteAction(index)} className="delete-button">
                                <MdDelete />
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ActionList;
