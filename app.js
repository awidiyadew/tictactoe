const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TicTacItem {
  constructor(position, character) {
    this.position = position;
    this.character = character;
  }
}

rl.question('Insert tictactoe char (X-O)? ', (input) => {
  let arr = Array.from(input);
  // todo : check is input valid

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

  rl.close();
});

function isInputValid(input) {
  return true;
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

/*function isRowEqual(thisChar, array, initValue, condition, finalExpression) {
  let isRowEqual = true;
  for (let i = initValue; i < condition; finalExpression) {
    const thatChar = array[i].character;
    isRowEqual = isRowEqual && thisChar === thatChar;
  }
  return isRowEqual;
}*/

/*function checkVertical(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position; i < ticTacToCheck.position + 7; i += 3) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }

  return isRowEqual ? ticTacToCheck : undefined;
}*/

function checkVertical(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position; i < ticTacToCheck.position + 7; i += 3) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }

  return isRowEqual ? ticTacToCheck : undefined;
}

function repeatTimes(fn, n) {
  return function() {
    while (n--) fn(...arguments);
  };
}

/*function checkVertical(ticTacToCheck, ticTacArray) {
  return isRowEqual(ticTacToCheck.character, ticTacArray, ticTacToCheck.position, ticTacToCheck.position + 7, finalExpression(3)) ? ticTacToCheck : undefined;
}*/

function checkDiagonal1(ticTacToCheck, ticTacArray) {
  let charToCheck = ticTacToCheck.character;
  let isRowEqual = true;
  for (let i = ticTacToCheck.position; i < 9; i += 4) {
    let charCompared = ticTacArray[i].character;
    isRowEqual = isRowEqual && charToCheck === charCompared;
  }

  return isRowEqual ? ticTacToCheck : undefined;
}

function lessThan(n) { return i => i < n }

function finalExpression(increment) {
  return (i) => {
    i += increment;
    return i;
  }
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