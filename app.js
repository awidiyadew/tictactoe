const readline = require('readline');

class TicTacItem {
  constructor(position, character) {
    this.position = position;
    this.character = character.toUpperCase();
  }
}

function checkHorizontal(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position + 1; i < ticTacToCheck.position + 3; i++) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }
  return isRowEqual ? ticTacToCheck : undefined;
}

function checkVertical(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position; i < ticTacToCheck.position + 7; i += 3) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }

  return isRowEqual ? ticTacToCheck : undefined;
}

function checkDiagonal1(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position; i < 9; i += 4) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }

  return isRowEqual ? ticTacToCheck : undefined;
}

function checkDiagonal2(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position; i < 7; i += 2) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }

  return isRowEqual ? ticTacToCheck : undefined;
}

function validateInput(input) {
  return new Promise((resolve, reject) => {
    const isValid = (input) => {
      const pattern = /[^XO-]/; // not contain 'X','O','-'
      const isValidChar = !pattern.test(input.toUpperCase());
      return isValidChar && input.length === 9;
    };

    const isGameInProgress = (input) => input.indexOf('-') !== -1;

    if (isValid(input)) {
      resolve(!isGameInProgress(input));
    } else {
      reject('Invalid game board');
    }
  });
}

function getFinalScore(input) {
  const arr = Array.from(input);
  const ticTacToeArray = arr.map((item, position) => new TicTacItem(position, item));

  const horizontalResult = [
    checkHorizontal(ticTacToeArray[0], ticTacToeArray),
    checkHorizontal(ticTacToeArray[3], ticTacToeArray),
    checkHorizontal(ticTacToeArray[6], ticTacToeArray)
  ];

  const verticalResult = [
    checkVertical(ticTacToeArray[0], ticTacToeArray),
    checkVertical(ticTacToeArray[1], ticTacToeArray),
    checkVertical(ticTacToeArray[2], ticTacToeArray)
  ];

  const diagonalResult = [
    checkDiagonal1(ticTacToeArray[0], ticTacToeArray),
    checkDiagonal2(ticTacToeArray[2], ticTacToeArray)
  ];

  return new Promise(resolve => {
    const allResult = [].concat(horizontalResult, verticalResult, diagonalResult);
    let scoreX = 0;
    let scoreO = 0;

    allResult.forEach((res) => {
      if (res instanceof TicTacItem) {
        if (res.character === 'X') {
          scoreX += 1;
        } else if (res.character === 'O') {
          scoreO += 1;
        }
      }
    });

    resolve([scoreX, scoreO]);
  });
}

function run(readline) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Insert tic-tac-toe char (xo-)? ', (input) => {
    validateInput(input)
      .then((shouldCalculateScore) => {
        if (shouldCalculateScore) {
          return getFinalScore(input);
        } else {
          throw 'Game still in progress!';
        }
      })
      .then((scores) => {
        const scoreX = scores[0];
        const scoreO = scores[1];

        if (scoreX === 1 && scoreO === 0) {
          console.log('X Wins!');
        } else if (scoreO === 1 && scoreX === 0) {
          console.log('O Wins!')
        } else if (scoreX === 0 && scoreO === 0) {
          console.log('Its a draw!');
        } else {
          console.log('Invalid game board');
        }
      })
      .catch((reason) => console.log(reason));

    rl.close();
  });
}

run(readline);