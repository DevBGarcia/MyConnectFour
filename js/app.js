let game = new Game();

const btnStartGame = document.querySelector('button#begin-game');

btnStartGame.addEventListener('click', (e) => {
  game.startGame();
  console.log(e);
  e.target.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
});


document.addEventListener('keydown', (e) => game.handleKeydown(e));