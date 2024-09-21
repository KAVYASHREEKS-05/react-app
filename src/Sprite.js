import React from 'react';

function Sprite({ sprite }){
  return (
    <div
      className="sprite"
      style={{
        transform: `translate(${sprite.x}px, ${sprite.y}px) rotate(${sprite.rotation}deg)`,
        width: `${sprite.size}px`,
        height: `${sprite.size}px`,
        fontSize: `${sprite.size / 2}px`,
      }}
    >
      <div className={`message ${sprite.message ? 'show' : ''}`}>{sprite.message}</div>
      {sprite.emoji}
    </div>
  );
};

export default Sprite;
