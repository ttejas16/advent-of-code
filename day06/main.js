import getFile from "../utils/getFile.js";
const input = getFile() || "";
const lines = input.split("\n").map(line => line.split(""));
const startIndex = input.replaceAll("\n", "").match(/\^/).index;
const rows = lines.length;
const cols = lines[0].length;
const directionIncrements = {
    "up": [-1, 0],
    "right": [0, 1],
    "down": [1, 0],
    "left": [0, -1],
};
function takeTurn(currentDirection) {
    switch (currentDirection) {
        case "up":
            return "right";
        case "down":
            return "left";
        case "right":
            return "down";
        case "left":
            return "up";
    }
}
console.time("Part 1");
let i = Math.floor(startIndex / rows);
let j = startIndex % cols;
let currentDirection = "up";
let currentIncrement = directionIncrements[currentDirection];
const visited = new Set();
while (i > -1 && i < rows && j > -1 && j < cols) {
    if (lines[i][j] == "#") {
        // take one step back
        i = i - currentIncrement[0];
        j = j - currentIncrement[1];
        currentDirection = takeTurn(currentDirection);
        currentIncrement = directionIncrements[currentDirection];
    }
    else {
        visited.add(`${i},${j}`);
        i = i + currentIncrement[0];
        j = j + currentIncrement[1];
    }
}
console.timeEnd("Part 1");
console.log(visited.size);
function wilLoop(i, j) {
    const visitedWithDirection = new Set();
    let currentDirection = "up";
    let currentIncrement = directionIncrements[currentDirection];
    while (i > -1 && i < rows && j > -1 && j < cols) {
        if (visitedWithDirection.has(`${i},${j},${currentDirection}`)) {
            return true;
        }
        if (lines[i][j] == "#") {
            // take one step back
            i = i - currentIncrement[0];
            j = j - currentIncrement[1];
            currentDirection = takeTurn(currentDirection);
            currentIncrement = directionIncrements[currentDirection];
        }
        else {
            visitedWithDirection.add(`${i},${j},${currentDirection}`);
            i = i + currentIncrement[0];
            j = j + currentIncrement[1];
        }
    }
    return false;
}
console.time("Part 2");
let result = 0;
for (const position of visited) {
    i = Math.floor(startIndex / rows);
    j = startIndex % cols;
    const [x, y] = position.split(",").map(n => +n);
    if (lines[x][y] == "#" || (x == i && y == j)) {
        continue;
    }
    lines[x][y] = "#";
    if (wilLoop(i, j)) {
        result += 1;
    }
    lines[x][y] = ".";
}
console.timeEnd("Part 2");
console.log(result);
