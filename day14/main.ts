import getFile from "../utils/getFile.js";

const input = getFile() || "";

interface Robot {
    x: number,
    y: number,
    velocity: {
        x: number,
        y: number
    }
}
const cols = 101;
const rows = 103;

const robots: Robot[] = input.split("\n").map(line => {
    const [position, velocity] = line
        .split(" ")
        .map(line => line.split("=")[1])
        .map(numString => numString.split(",").map(n => +n));

    return {
        x: position[0],
        y: position[1],
        velocity: {
            x: velocity[0],
            y: velocity[1],
        }
    }
})

function walkRobot(robot: Robot, seconds: number) {
    let x = robot.x;
    let y = robot.y;

    for (let i = 0; i < seconds; i++) {

        x += robot.velocity.x;
        y += robot.velocity.y;

        if (x < 0) {
            x = cols - (-x);
        }
        else if (x >= cols) {
            x = (x - cols);
        }

        if (y < 0) {
            y = rows - (-y);
        }
        else if (y >= rows) {
            y = (y - rows);
        }
    }

    return [x, y];
}

const quadrants = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
}

const xMid = Math.floor(cols / 2);
const yMid = Math.floor(rows / 2);

function addToQuadrant(x: number, y: number) {
    if (x < xMid && y > yMid) {
        quadrants[1] += 1;
    }
    else if (x < xMid && y < yMid) {
        quadrants[2] += 1;
    }
    else if (x > xMid && y < yMid) {
        quadrants[3] += 1;
    }
    else if (x > xMid && y > yMid) {
        quadrants[4] += 1;
    }
}

for (const robot of robots) {
    const [lastX, lastY] = walkRobot(robot, 100);
    addToQuadrant(lastX, lastY);
}

// console.log(Object.values(quadrants).reduce((acc,n) => acc * n,1));


function moveAllRobots(robots: Robot[]) {

    let clashed = false;
    const positions = new Set<string>();

    for (const robot of robots) {
        robot.x += robot.velocity.x;
        robot.y += robot.velocity.y;

        if (robot.x < 0) {
            robot.x = cols - (-robot.x);
        }
        else if (robot.x >= cols) {
            robot.x = (robot.x - cols);
        }

        if (robot.y < 0) {
            robot.y = rows - (-robot.y);
        }
        else if (robot.y >= rows) {
            robot.y = (robot.y - rows);
        }

        if (positions.has(`${robot.x},${robot.y}`)) {
            clashed = true;
        }

        positions.add(`${robot.x},${robot.y}`)
    }

    return clashed;
}

function printMap(r: number, c: number, treeCords: Set<string>) {
    for (let i = 0; i < r; i++) {
        for(let j = 0;j < c;j++){
            if (treeCords.has(`${i},${j}`)) {
                process.stdout.write("*");
            }
            else{
                process.stdout.write(" ");
                
            }    
        }
        console.log();
    }
}
function simulate() {
    let time = 0;

    while (true) {
        const res = moveAllRobots(robots);
        if (!res) {
            break;
        }

        time += 1;
    }

    const treeCords = robots.map(robot => [robot.x, robot.y]);
    const tempSet = new Set<string>();

    treeCords.forEach(c => {
        tempSet.add(c.join());
    })

    printMap(rows,cols,tempSet);
    console.log(time);
    
}

simulate();