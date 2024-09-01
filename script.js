const rows = document.querySelectorAll('tr');
rows.forEach((row) => {
    Array.from(row.children).forEach((cell) => {
        cell.textContent = "";
    });
});

let board = new Array(9).fill("").map(() => new Array(9).fill(""));
rows.forEach((row) => {
    Array.from(row.children).forEach((cell) => {
        cell.addEventListener("click", function() {
            cell.contentEditable = "true";
            cell.focus();
            cell.removeEventListener('click', () => {
                console.log("clicked");
            });
            cell.addEventListener('keydown', (e) => {
                const key = e.key;
                if(key >= "1" && key <= "9") {
                    e.preventDefault();
                    cell.textContent = key;
                    cell.style.color = "blue";
                }
                else if(key === "Backspace") {
                    e.preventDefault();
                    cell.textContent = "";
                }
                else {
                    e.preventDefault();
                }
            });
            cell.removeEventListener('keydown', () => {
            });
            cell.addEventListener('blur', () => {
                cell.contentEditable = "false";
            });
        });
    });
});

let timer = 0;

const reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    rows.forEach((row) => {
        Array.from(row.children).forEach((cell) => {
            cell.textContent = "";
            cell.style.color = "black";
        });
    });
    timer = 0;
    board.forEach((row) => {
        row.fill("");
    });
    console.log(board);
});

const solve = document.getElementById('solve');
solve.addEventListener('click', () => {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            board[i][j] = rows[i].children[j].textContent;
        }
    }
    console.log(board);
    solveSudoku(board, 0)
});

function solveSudoku(board) {
    console.log(board);
    const n = board.length;
    const result = dfs(board);
    if(result) {
        console.log(board);
    }
    else
        console.log("No solution");
  }
  
  function dfs(board) {
    console.log(board);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== "") continue;
        for (let i = 1; i <= 9; i++) {
          const c = i.toString();
          if (isValid(board, row, col, c)) {
            setTimeout(() => {
            rows[row].children[col].textContent = c;
            }, timer);
            timer += 2;
            board[row][col] = c;
            if (dfs(board)) return true;
            else {
                setTimeout(() => {
                rows[row].children[col].textContent = "";
                }, timer);
                timer += 2;
                board[row][col] = "";
            }
          }
        }
        return false;
      }
    }
    return true;
  }
  
  function isValid(board, row, col, c) {
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === c || board[i][col] === c) return false;
      const curRow = blockRow +  Math.floor(i / 3);
      const curCol = blockCol +  Math.floor(i % 3);
      if (board[curRow][curCol] === c) return false;
    }
    return true;
  }
