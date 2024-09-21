export function checkOverlap(sprite1, sprite2){
    const padding = 0;
    return (
      sprite1.x < sprite2.x + sprite2.size + padding &&
      sprite1.x + sprite1.size > sprite2.x &&
      sprite1.y < sprite2.y + sprite2.size + padding &&
      sprite1.y + sprite1.size > sprite2.y
    );
  };
  