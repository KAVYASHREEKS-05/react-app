import React from 'react';
import { FaListUl } from "react-icons/fa";
function AvailableActions(){
    return (
        <div className="available-actions">
            <div className="header">
                <h3><FaListUl />     Available Actions</h3>
            </div>
            <div className="actions">
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'move-x', value: 50 }))}
                >
                    Move X by 50
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'move-y', value: 50 }))}
                >
                    Move Y by 50
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'rotate', value: 360 }))}
                >
                    Rotate 360
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'resize', value: 20 }))}
                >
                    Increase Size
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'resize', value: -20 }))}
                >
                    Decrease Size
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'go-to', value: { x: 0, y: 0 } }))}
                >
                    Go to (0,0)
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'go-to-random', value: null }))}
                >
                    Go to Random Position
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'say-hello', value: true }))}
                >
                    Say Hello
                </div>
                <div
                    className="action"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('action', JSON.stringify({ type: 'repeat', value: 2 }))}
                >
                    Repeat Actions 2x
                </div>
            </div>
        </div>
    );
};

export default AvailableActions;
