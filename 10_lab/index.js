const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const move = document.querySelector('#move');
const newRoundButton = document.querySelector('#newRound');
const resetButton = document.querySelector('#reset');

let arr = [];
let counterOfMoves = 0;
let player = 'second';

newRoundButton.addEventListener('click', () => {
    arr = [];
    counterOfMoves = 0;
    player = 'second';
    paint();
})
resetButton.addEventListener('click', () => {
    if (counterOfMoves !== 0) window.location.reload();
})

const paint = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i <= 100; i += 50) {
        arr[i / 50] = [];
        for (let j = 0; j <= 100; j += 50) {
            const square = new Path2D();
            square.rect(i, j, 50, 50);
            ctx.stroke(square);

            canvas.addEventListener('click', function (e) {
                const posX = Math.floor(e.offsetX / 50);
                const posY = Math.floor(e.offsetY / 50);
                if ((ctx.isPointInPath(square, e.offsetX, e.offsetY)) && (!arr[posY][posX])) {
                    ctx.strokeStyle = 'red';
                    player = player === 'first' ? 'second' : 'first';
                    counterOfMoves++;
                    if (player === 'second') {
                        move.textContent = '1 игрок (Х)';
                    } else {
                        move.textContent = '2 игрок (O)';
                    }
                    arr[posY][posX] = player;
                    ctx.font = '40px serif';
                    ctx.fillText(player === 'first' ? 'X' : 'O', posX * 50 + 12.5, (posY + 1) * 50 - 12.5);
                    if (counterOfMoves >= 5) checkWin();
                } else {
                    ctx.strokeStyle = 'black';
                }
                ctx.stroke(square);
            });
        }
    }
}

let first = document.querySelector('#first');
let second = document.querySelector('#second');

const win = () => {
    alert(`win ${player}`);
    player === 'first' ? second.textContent = +second.textContent + 1 : first.textContent = +first.textContent + 1;
    arr = [];
    counterOfMoves = 0;
    paint();
}

const checkWin = () => {
    ctx.font = '20px serif';
    if (counterOfMoves !== 9) {
        if ((arr[2][2] == arr[1][1] && arr[0][0] == arr[2][2]) ||
            (arr[0][2] == arr[1][1] && arr[2][0] == arr[1][1])) {
            win();
        }
        for (let i = 0; i <= 2; i++) {
            const j = 2;
            if (arr[i][j] == arr[i][j - 1] && arr[i][j - 2] == arr[i][j]) {
                win();
                return;
            }
        }
        for (let j = 0; j <= 2; j++) {
            const i = 2;
            if (arr[i][j] == arr[i - 1][j] && arr[i - 2][j] == arr[i][j]) {
                win();
                return;
            }
        }
    } else {
        paint();
        alert('Ничья');
    }
}

paint();