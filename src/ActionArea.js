import React from 'react';
import { checkOverlap } from './utils'; 
import Sprite from './Sprite';
import { IoIosPlay } from "react-icons/io";
import { IoReload } from "react-icons/io5";

function ActionArea({ sprites, setSprites, actions, setActions }){
  function playActions(){
    sprites.forEach((sprite, spriteIndex) => {
      const spriteActions = actions[spriteIndex] || [];
      let repeatCount = 0;

      spriteActions.forEach((action, index) => {
        const delay = index * 1000;

        if (action.type === 'repeat') {
          repeatCount = action.value;
        } else {
          setTimeout(() => {
            executeAction(spriteIndex, action);
          }, delay);
        }
      });

      for (let i = 0; i < repeatCount; i++) {
        const repeatDelay = (spriteActions.length + i) * 1000;
        setTimeout(() => {
          spriteActions.forEach((action, index) => {
            setTimeout(() => {
              executeAction(spriteIndex, action);
            }, index * 100);
          });
        }, repeatDelay);
      }
    });
  };

  function executeAction(spriteIndex, action){
    setSprites((prevSprites) => {
      const updatedSprites = [...prevSprites];
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const spriteSize = updatedSprites[spriteIndex].size;
      const currentSprite = updatedSprites[spriteIndex];

      for (let i = 0; i < updatedSprites.length; i++) {
        if (i !== spriteIndex && checkOverlap(currentSprite, updatedSprites[i])) {
          const tempActions = actions[spriteIndex];
          setActions((prevActions) => {
            const newActions = [...prevActions];
            newActions[spriteIndex] = actions[i];
            newActions[i] = tempActions;
            return newActions;
          });
          break;
        }
      }

      const newSprite = { ...currentSprite };
      switch (action.type) {
        case 'move-x':
          if (!newSprite.fixed) {
            newSprite.x = Math.min(Math.max(0, newSprite.x + action.value), viewportWidth - spriteSize);
          }
          break;
        case 'move-y':
          if (!newSprite.fixed) {
            newSprite.y = Math.max(0, newSprite.y + action.value);
          }
          break;
        case 'rotate':
          newSprite.rotation += action.value;
          break;
        case 'resize':
          newSprite.size = Math.max(10, newSprite.size + action.value);
          break;
        case 'go-to':
          newSprite.x = Math.min(Math.max(0, action.value.x), viewportWidth - spriteSize);
          newSprite.y = Math.min(Math.max(0, action.value.y), viewportHeight - spriteSize);
          break;
        case 'go-to-random':
          newSprite.x = Math.floor(Math.random() * (viewportWidth - spriteSize));
          newSprite.y = Math.floor(Math.random() * (viewportHeight - spriteSize));
          break;
        case 'say-hello':
          newSprite.message = 'Hello!';
          if (action.value) {
            clearTimeout(newSprite.messageTimeout);
            newSprite.messageTimeout = setTimeout(() => {
              newSprite.message = '';
              setSprites((prev) => [...prev]);
            }, 1000);
          }
          break;
        default:
          break;
      }

      updatedSprites[spriteIndex] = newSprite;
      return updatedSprites;
    });
  };

  return (
    <div className="action-area">
      {sprites.map((sprite, index) => (
        <Sprite key={index} sprite={sprite} />
      ))}
      <div className="controls">
        <button onClick={playActions} className='Play-button'>
          <IoIosPlay />
        </button>
        <button onClick={() => window.location.reload()} className='Reload-button'><IoReload /></button>
      </div>
    </div>
  );
};

export default ActionArea;
