import getFile from "../utils/getFile.js";

const input = getFile() || "";

const data = input.split("\n");
// console.log(data);

const rows = data.length;
const cols = data[0].length;

const completeTrailHeads = new Map<string, Set<string>>();
const trails = new Map<string,number>();

const increments = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function getValidChilds(rows: number, cols: number, i: number, j: number, data: string[]) {
    const childs = increments.map(([x, y]) => [i + x, j + y]);

    // check bounds
    const inBoundChilds = childs.filter(([x, y]) => {
        if (x < 0 || x >= cols || y < 0 || y >= rows) {
            return false;
        }

        return true;
    })

    // check elevation of childs
    const validChilds = inBoundChilds.filter(([x, y]) => {

        if ((+data[x][y]) - (+data[i][j]) != 1) {
            return false;
        }

        return true;
    })

    return validChilds;
}

function dfs(rows: number, cols: number, i: number, j: number, zeroPosition: string, data: string[]) {
    if (data[i][j] == '9') {
        
        if (!completeTrailHeads.has(zeroPosition)) {
            completeTrailHeads.set(zeroPosition, new Set());
            trails.set(zeroPosition,0);
        }

        trails.set(zeroPosition,trails.get(zeroPosition)! + 1);
        completeTrailHeads.get(zeroPosition)?.add(`${i},${j}`)
        return;
    }

    const validChilds = getValidChilds(rows, cols, i, j, data);
    validChilds.forEach(([x,y]) => {
        dfs(rows, cols, x, y, zeroPosition, data);
    })
}

console.time("Time");
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (data[i][j] != '0') {
            continue;
        }
        
        dfs(rows, cols, i, j, `${i},${j}`, data);
        // break;
    }
    // break;
}
console.timeEnd("Time");

const result = [...completeTrailHeads.values()].reduce((acc,set) => acc + set.size,0);
const resultP2 = [...trails.values()].reduce((acc,count) => acc + count,0);

console.log(result);
console.log(resultP2);
