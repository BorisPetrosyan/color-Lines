let main = document.querySelector('.main');

let bounces = [
    "blue.png",
    "Coco.png",
    "green.png",
    "red.png",
    "yellow.png",
    "blue.png",
    "Coco.png",
    "green.png",
    "red.png",
    "yellow.png",
]
let shuffledd = []

function randomMy() {
    shuffledd = bounces
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

}
randomMy()
    //console.log(shuffledd)

let playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
//console.log(shuffledd)

function updatePlayfiled(clicks) {
    let position1_x = clicks[0].x,
        position1_y = clicks[0].y,
        position1_ball = clicks[0].ball,
        position2_x = clicks[1].x,
        position2_y = clicks[1].y,
        position2_ball = clicks[1].ball
        //console.log(positon2_x, postiton2_y, positon1_ball)
    playfield[position2_y][position2_x] = +position1_ball;
    playfield[position1_y][position1_x] = +position2_ball;
    draw()
    insertNewRandomBalls()
    insertNewRandomBalls()
    insertNewRandomBalls()
    insertNewRandomBalls()




}

function insertNewRandomBalls() {
    let randomY = Math.floor(Math.random() * Math.floor(9));
    let randomX = Math.floor(Math.random() * Math.floor(9));
    let randomBall = Math.floor(Math.random() * 5) + 1;
    console.log(randomBall)

    checkHasBalls(randomY, randomX, randomBall)
}

function checkHasBalls(randomY, randomX, randomBall) {
    for (let y = 0; y < playfield.length; y++) {

        for (let x = 0; x < playfield[y].length; x++) {

            if (playfield[randomY][randomX] === 0) {
                // console.log('yes')
                playfield[0][randomX] = randomBall
            } else {
                // console.log('xer')
            }

        }
    }
}

function draw() {
    let mainInnerHTML = '';
    for (let y = 0; y < playfield.length; y++) {

        for (let x = 0; x < playfield[y].length; x++) {
            // randomMy()
            if (playfield[y][x] === 1) {
                mainInnerHTML += `<img data-x='${x}'data-y='${y}' data-ball='1'  class="item"src=${shuffledd[0]}>`
            } else if (playfield[y][x] === 2) {
                mainInnerHTML += `<img data-x='${x}'data-y='${y}' data-ball='2'  class="item"src=${shuffledd[1]}>`;
            } else if (playfield[y][x] === 3) {
                mainInnerHTML += `<img data-x='${x}'data-y='${y}' data-ball='3'  class="item"src=${shuffledd[2]}>`;
            } else if (playfield[y][x] === 4) {
                mainInnerHTML += `<img data-x='${x}'data-y='${y}' data-ball='4'  class="item"src=${shuffledd[3]}>`;
            } else if (playfield[y][x] === 5) {
                mainInnerHTML += `<img data-x='${x}'data-y='${y}' data-ball='5'  class="item"src=${shuffledd[4]}>`;
            } else {
                mainInnerHTML += `<img data-x='${x}'data-y='${y}' data-ball='0' src="Empty.png">`;
            }
        }
    }

    main.innerHTML = mainInnerHTML;
};

function drowOnSecondClick() {

}

const boardClick = function(event) {
    const click = event.target

    if (check(click)) {
        draw()
    }
}
main.addEventListener('click', boardClick)



let clicks = []

function check(click) {

    if (click.attributes.src.nodeValue) {
        let clickInfo = click.dataset
        clickInfo = JSON.parse(JSON.stringify(clickInfo));
        clicks.push(clickInfo)
            //console.log(clicks)

        if (clicks[0].ball === '0') {
            clicks = []
            return false
        }

        if (clicks[1]) {
            if (clicks[1].ball !== '0') {
                clicks = []
                return false
            }
        }
        if (clicks.length === 2) {
            updatePlayfiled(clicks)
            clicks = []
            return true
        }

    }
}

draw()
let checkSrc = Array.from(new Set(shuffledd))
shuffledd = checkSrc