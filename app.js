const readline = require('readline');

class TicTacItem {
  constructor(position, character) {
    this.position = position;
    this.character = character;
  }
}

function isInputValid(input) {
  const pattern = /[^xo-]/;
  const isValidChar = !pattern.test(input);
  return isValidChar && input.length === 9;
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
      if (res.character === 'x') {
        scoreX += 1;
      } else if (res.character === 'o') {
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
      if (res.character === 'x') {
        scoreX += 1;
      } else if (res.character === 'o') {
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
      if (res.character === 'x') {
        scoreX += 1;
      } else if (res.character === 'o') {
        scoreO += 1;
      }
    }
  });

  console.log(`result X = ${scoreX}`);
  console.log(`result O = ${scoreO}`);
}

function run(readline) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Insert tic-tac-toe char (X-O)? ', (input) => {
    if (isInputValid(input)) {
      console.log('valid');
      if (isGameInProgress(input)) {
        console.log('game in progress');
      } else {
        console.log('valid game >>> calculate game!');
        calculateScore(input);
      }
    } else {
      console.log('invalid board');
    }

    rl.close();
  });
}

run(readline);