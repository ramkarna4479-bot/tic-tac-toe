let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".again");
let statusText = document.querySelector("#status");

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


/* Box Click */

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (gameOver) {
            return;
        }

        if (turnO) {

            box.innerText = "O";

            box.classList.add("o");

            turnO = false;

            statusText.innerText = "Player X's Turn";

        } 
        
        else {

            box.innerText = "X";

            box.classList.add("x");

            turnO = true;

            statusText.innerText = "Player O's Turn";
        }

        box.disabled = true;

        checkWinner();
    });

});


/* Check Winner */

const checkWinner = () => {

    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== ""
        ) {

            if (
                pos1Val === pos2Val &&
                pos2Val === pos3Val
            ) {

                statusText.innerText =
                    "🎉 Player " + pos1Val + " Wins!";

                gameOver = true;

                disableBoxes();

                return;
            }
        }
    }

    checkDraw();
};


/* Check Draw */

const checkDraw = () => {

    let allFilled = true;

    boxes.forEach((box) => {

        if (box.innerText === "") {
            allFilled = false;
        }

    });

    if (allFilled && !gameOver) {

        statusText.innerText = "🤝 It's a Draw!";

        gameOver = true;
    }
};


/* Disable all boxes */

const disableBoxes = () => {

    boxes.forEach((box) => {
        box.disabled = true;
    });

};


/* Reset Game */

resetbtn.addEventListener("click", () => {

    boxes.forEach((box) => {

        box.innerText = "";

        box.disabled = false;

        box.classList.remove("o");
        box.classList.remove("x");

    });

    turnO = true;

    gameOver = false;

    statusText.innerText = "Player O's Turn";

});