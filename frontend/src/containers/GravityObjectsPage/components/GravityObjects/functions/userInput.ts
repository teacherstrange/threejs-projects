export const userInput = () => {
  let gameStarted = false;

  const handleClick = () => {
    if (!gameStarted) {
      gameStarted = true;
    } else {
    }
  };

  window.addEventListener('click', handleClick);

  const destroy = () => {
    window.removeEventListener('click', handleClick);
  };

  return {
    gameStarted,
    destroy,
  };
};
