let currentPlayer = "X";
  const winningCombinations = [
    "012",
    "345",
    "678",
    "036",
    "147",
    "258",
    "048",
    "246",
  ];

  let xArray = [];
  let oArray = [];

  let gameOver = false;

  const clearCells = () => {
    const cells = document.getElementsByClassName('cell');

    for(let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
    }
  }

  const reset = () => {
    xArray = [];
    oArray = [];
    gameOver = false;
    currentStatus.innerHTML = `Current Player: ${currentPlayer}`;
    currentStatus.style.color = "black";
    clearCells();
  }

  const checkWinner = (array) => {
    const formattedData = array.sort().toString().replace(/,/g, "");
    let flag = false;
    winningCombinations.forEach((item) => {
      if (formattedData.includes(item)) {
        flag = true;
        currentStatus.innerHTML = `Game Over! ${currentPlayer} wins!`;
        currentStatus.style.color = "red";

        const restartBtn = document.createElement('button');
        restartBtn.style.padding = '10px 20px';
        restartBtn.style.marginBottom = '10px';

        restartBtn.innerHTML = 'Restart';

        restartBtn.onclick = () => {
          reset();
          restartBtn.remove();
        }
        currentStatus.after(restartBtn);
      }
    });
    gameOver = flag;
  };

  const pushPosition = (player, position) => {
    if (player === "X") {
      xArray.push(position);
      checkWinner(xArray);
    } else {
      oArray.push(position);
      checkWinner(oArray);
    }
  };

  const changeCurrentPlayer = () => {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    return currentPlayer;
  };

  const heading = document.getElementById("heading");
  const currentStatus = document.createElement("h5");
  currentStatus.innerHTML = `Current Player: ${currentPlayer}`;
  currentStatus.style.fontSize = '45px';

  heading.append(currentStatus);

  const cells = document.getElementsByClassName("cell");

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", () => {
      if (cells[i].childNodes.length === 0 && !gameOver) {
        const span = document.createElement("span");
        span.classList.add("ticSpan");
        span.innerHTML = currentPlayer;

        pushPosition(currentPlayer, i);
        cells[i].appendChild(span);
        changeCurrentPlayer();
      }
    });
  }