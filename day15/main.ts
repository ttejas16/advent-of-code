import { time } from "console";
import getFile from "../utils/getFile.js";

const input = getFile() || "";

const data = input.split("\n\n");

function findStart(house: string[][]) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (house[i][j] == "@") {
                return [i, j]
            }
        }
    }

    return [-1, -1];
}

const warehouse = data[0].split("\n").map(line => line.split(""));
const directions = data[1].replaceAll("\n", "");

const rows = warehouse.length;
const cols = warehouse[0].length;
const directionVector = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    'v': [0, 1],
}


function walkRobot(x: number, y: number, dirVector: number[]) {
    const start = [x, y];
    const newStart = [-1, -1];

    let nextLetter = warehouse[x + dirVector[1]][y + dirVector[0]];

    while (nextLetter == "@" || nextLetter == "[" || nextLetter == "]") {
        x += dirVector[1];
        y += dirVector[0];

        nextLetter = warehouse[x + dirVector[1]][y + dirVector[0]];
    }

    if (warehouse[x + dirVector[1]][y + dirVector[0]] == "#") {
        return start;
    }

    const revDirVector = dirVector.map(n => -n);

    while (true) {
        warehouse[x + dirVector[1]][y + dirVector[0]] = warehouse[x][y];

        if (warehouse[x][y] == "@") {
            warehouse[x][y] = ".";
            newStart[0] = x + dirVector[1];
            newStart[1] = y + dirVector[0];
            break;
        }

        warehouse[x][y] = ".";
        x += revDirVector[1];
        y += revDirVector[0];


    }

    return newStart;
}


function canBoxBeMoved(x: number, y: number, dirVector: number[]) {
    const boxChars: number[][] = [];

    if (warehouse[x][y] == '[') {
        boxChars.push([x, y]);
        boxChars.push([x, y + 1]);
    }
    else {
        boxChars.push([x, y - 1]);
        boxChars.push([x, y]);
    }


    // console.log([x,y]);
    // return false;

    const nextChars = boxChars.map(ch => [ch[0] + dirVector[1], ch[1] + dirVector[0]]);
    // console.log([x,y]);

    if (nextChars.some(v => warehouse[v[0]][v[1]] == "#")) {
        return false;
    }

    const left = nextChars[0];
    const right = nextChars[1];


    const positionsToBeMoved: number[][] = [];

    if (warehouse[left[0]][left[1]] == "[" && warehouse[right[0]][right[1]] == "]") {
        /**
         * []
         * []
         */
        // call recursively but only once
        const res = canBoxBeMoved(left[0], left[1], dirVector);
        if (typeof res == "boolean") {
            return false;
        }

        positionsToBeMoved.push(...res);

    }
    else if (warehouse[left[0]][left[1]] == "]" && warehouse[right[0]][right[1]] == "[") {
        /**
         * []
         * ][
         * 
         * ][
         * []
         */
        const res1 = canBoxBeMoved(left[0], left[1], dirVector);
        if (typeof res1 == "boolean") {
            return false;
        }
        positionsToBeMoved.push(...res1);

        const res2 = canBoxBeMoved(right[0], right[1], dirVector);
        if (typeof res2 == "boolean") {
            return false;
        }
        positionsToBeMoved.push(...res2);
    }
    else if(warehouse[left[0]][left[1]] == "[" || warehouse[left[0]][left[1]] == "]"){

        // console.log(nextChars);
        // printWarehouse()
        // process.exit();
        /**
         * []
         * ].
         * 
         * []
         * .[
         * 
         * ].
         * []
         * 
         * 
         * .[
         * []
         */
        const res = canBoxBeMoved(left[0], left[1], dirVector);
        if (typeof res == "boolean") {
            return false;
        }

        positionsToBeMoved.push(...res);
    }
    else if(warehouse[right[0]][right[1]] == "[" || warehouse[right[0]][right[1]] == "]"){

        // console.log(nextChars);
        // printWarehouse()
        // process.exit();
        /**
         * []
         * ].
         * 
         * []
         * .[
         * 
         * ].
         * []
         * 
         * 
         * .[
         * []
         */
        const res = canBoxBeMoved(right[0], right[1], dirVector);
        if (typeof res == "boolean") {
            return false;
        }

        positionsToBeMoved.push(...res);
    }

    positionsToBeMoved.push(...boxChars);

    // console.log(positionsToBeMoved);
    return positionsToBeMoved;

}

function movePositions(positions: number[][], dirVector: number[]) {
    const newStart = [-1, -1];
    for (const [x, y] of positions) {
        warehouse[x + dirVector[1]][y + dirVector[0]] = warehouse[x][y];
        if (warehouse[x][y] == '@') {
            newStart[0] = x + dirVector[1];
            newStart[1] = y + dirVector[0];
        }
        warehouse[x][y] = '.';
    }
    return newStart;
}

function printWarehouse() {
    warehouse.forEach(arr => {
        console.log(arr.join(""));
    })
    console.log();

}

const start = findStart(warehouse);


// part 1
// console.time("Time");
// for (let i = 0; i < directions.length; i++) {
//     const v = directionVector[directions[i]];
//     const res = walkRobot(start[0], start[1], v);
//     // console.log(directions[i],v);
//     // console.log();


//     start[0] = res[0];
//     start[1] = res[1];
// }
// console.timeEnd("Time");

// let result = 0;
// for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//         if (warehouse[i][j] == 'O') {
//             result += ((100 * i) + j);
//         }

//     }
// }
// console.log(result);

// printWarehouse();



async function main() {

    for (let i = 0; i < directions.length; i++) {
        const v = directionVector[directions[i]];


        if (directions[i] == '<' || directions[i] == '>') {
            const res = walkRobot(start[0], start[1], v);
            start[0] = res[0];
            start[1] = res[1];
        }
        else {
            const nextX = start[0] + v[1];
            const nextY = start[1] + v[0];

            if (warehouse[nextX][nextY] == '[' || warehouse[nextX][nextY] == ']') {
                const res = canBoxBeMoved(nextX, nextY, v);
                if (res) {
                    res.push([start[0], start[1]]);

                    const newStart = movePositions(res, v);
                    start[0] = newStart[0];
                    start[1] = newStart[1];
                }

            }
            else if (warehouse[nextX][nextY] == '.') {
                const newStart = movePositions([[start[0], start[1]]], v);
                start[0] = newStart[0];
                start[1] = newStart[1];
            }

        }

        // console.log(directions[i]);
        // printWarehouse();

        // await new Promise((resolve, reject) => {
        //     setTimeout(resolve, 1000);
        // })
    }
}

main();
printWarehouse();


let result = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (warehouse[i][j] == '[') {
            result += ((100 * i) + j);
        }

    }
}
console.log(result);