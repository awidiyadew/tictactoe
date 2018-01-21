const readline = require('readline');

class TicTacItem {
  constructor(position, character) {
    this.position = position;
    this.character = character.toUpperCase();
  }
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

function promiseCheckHorizontal(ticTacToCheck, ticTacArray) {
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

function mantap(input) {
  getFinalScore(input)
    .then(scores => {
      console.log('final score x,o = ', scores);
    })
    .catch(err => console.log(err));
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

function getFinalScore(input) {
  let arr = Array.from(input);
  let ticTacToeArray = arr.map((item, position) => new TicTacItem(position, item));

  let results1 = [
    checkHorizontal(ticTacToeArray[0], ticTacToeArray),
    checkHorizontal(ticTacToeArray[3], ticTacToeArray),
    checkHorizontal(ticTacToeArray[6], ticTacToeArray)
  ];

  let results2 = [
    checkVertical(ticTacToeArray[0], ticTacToeArray),
    checkVertical(ticTacToeArray[1], ticTacToeArray),
    checkVertical(ticTacToeArray[2], ticTacToeArray)
  ];

  let results3 = [
    checkDiagonal1(ticTacToeArray[0], ticTacToeArray),
    checkDiagonal2(ticTacToeArray[2], ticTacToeArray)
  ];

  return new Promise(resolve => {
    let allResult = [].concat(results1, results2, results3);
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

run(readline);
//mantap('xoxxoooxo');
//mantap('xxxoxooxo');
//mantap('xoxxooxxo');