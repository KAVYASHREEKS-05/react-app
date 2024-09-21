import React, { useState } from 'react';
import ActionArea from './ActionArea';
import AvailableActions from './AvailableActions';
import ActionList from './ActionList';
import { AiFillDelete } from "react-icons/ai";
import './App.css';

function App(){
  const initialSprite = { x: 0, y: 0, rotation: 0, size: 100, message: '', messageTimeout: null, emoji: '🐱' };
  const [sprites, setSprites] = useState([initialSprite]);
  const [actions, setActions] = useState([[]]);
  const [view, setView] = useState('initial');

  const emojis = ['🐼', '🐶', '🏀', '🦄', '🚗', '🍩'];

  function handleDone(){
    setView('initial');
  };

  function addSprite(){
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newSprite = { ...initialSprite, emoji: randomEmoji, fixed: false };
    setSprites((prevSprites) => [...prevSprites, newSprite]);
    setActions((prevActions) => [...prevActions, []]); 
  };

  function deleteSprite(index){
    setSprites((prevSprites) => prevSprites.filter((_, i) => i !== index));
    setActions((prevActions) => prevActions.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      {view === 'initial' ? (
        <>
          <ActionArea 
            sprites={sprites} 
            setSprites={setSprites} 
            actions={actions} 
            setActions={setActions} 
          />
          <div className="bottom-controls">
            {sprites.map((sprite, index) => (
              <div key={index} className="sprite-controls">
                <button onClick={() => setView('actionSetup')} className="add-action-button">
                   {sprite.emoji}<div>Add Action</div>
                </button>
                <button onClick={() => deleteSprite(index)} className="delete-sprite-button"><AiFillDelete /></button>
              </div>
            ))}
            <button onClick={addSprite} className="add-cat-button">+</button>
          </div>
        </>
      ) : (
        <>
          <div className="drag-drop-container">
            <div className="available-actions-section">
              <AvailableActions />
            </div>
            <div className="action-list-section">
              {sprites.map((_, index) => (
                <ActionList
                  key={index}
                  spriteIndex={index}
                  actions={actions}
                  setActions={setActions} 
                  removeSprite={() => deleteSprite(index)}
                />
              ))}
            </div>
          </div>
          <div className="done-button-container">
            <button onClick={handleDone} className="done-button">Done</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
