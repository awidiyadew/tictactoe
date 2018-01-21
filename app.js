const readline = require('readline');

class TicTacItem {
  constructor(position, character) {
    this.position = position;
    this.character = character.toUpperCase();
  }
}

function isGameInProgress(input) {
  return input.indexOf('-') !== -1;
}

// only check by first value
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

function calculateScore(input) {
  return new Promise(((resolve, reject) => {
    let arr = Array.from(input);

    let ticTacToeArray = arr.map((item, position) => new TicTacItem(position, item));
    let scoreX = 0;
    let scoreO = 0;

    let horizontalResult = [];
    horizontalResult.push(checkHorizontal(ticTacToeArray[0], ticTacToeArray));
    horizontalResult.push(checkHorizontal(ticTacToeArray[3], ticTacToeArray));
    horizontalResult.push(checkHorizontal(ticTacToeArray[6], ticTacToeArray));

    horizontalResult.forEach((res) => {
      if (res instanceof TicTacItem) {
        if (res.character === 'X') {
          scoreX += 1;
        } else if (res.character === 'O') {
          scoreO += 1;
        }
      }
    });

    let verticalResult = [];
    verticalResult.push(checkVertical(ticTacToeArray[0], ticTacToeArray));
    verticalResult.push(checkVertical(ticTacToeArray[1], ticTacToeArray));
    verticalResult.push(checkVertical(ticTacToeArray[2], ticTacToeArray));

    verticalResult.forEach((res) => {
      if (res instanceof TicTacItem) {
        if (res.character === 'X') {
          scoreX += 1;
        } else if (res.character === 'O') {
          scoreO += 1;
        }
      }
    });

    let diagonalResult1 = checkDiagonal1(ticTacToeArray[0], ticTacToeArray);
    let diagonalResult2 = checkDiagonal2(ticTacToeArray[2], ticTacToeArray);
    let diagonalResult = [];
    diagonalResult.push(diagonalResult1);
    diagonalResult.push(diagonalResult2);

    diagonalResult.forEach((res) => {
      if (res instanceof TicTacItem) {
        if (res.character === 'X') {
          scoreX += 1;
        } else if (res.character === 'O') {
          scoreO += 1;
        }
      }
    });

    console.log(`result X = ${scoreX}`);
    console.log(`result O = ${scoreO}`);

    if (scoreX === 1 && scoreO === 0) {
      resolve('X Wins!');
    } else if (scoreO === 1 && scoreX === 0) {
      resolve('O Wins!')
    } else if (scoreX === 0 && scoreO === 0) {
      resolve('Its a draw!');
    } else {
      reject('Invalid game board');
    }

  }));
}

function validateInput(input) {
  return new Promise((resolve, reject) => {
    const isValid = (input) => {
      const pattern = /[^XO-]/; // not contain 'X','O','-'
      const isValidChar = !pattern.test(input.toUpperCase());
      return isValidChar && input.length === 9;
    };

    if (isValid(input)) {
      resolve(!isGameInProgress(input));
    } else {
      reject('Invalid game board');
    }
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
          return calculateScore(input);
        } else {
          throw 'Game still in progress!';
        }
      })
      .then((message) => console.log(message))
      .catch((reason) => console.log(reason));

    rl.close();
  });
}

run(readline);