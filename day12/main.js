import getFile from "../utils/getFile.js";
const input = getFile() || "";
const data = input.split("\n");
const rows = data.length;
const cols = data[0].length;
const visited = new Set();
const increments = [[0, 1], [1, 0], [0, -1], [-1, 0]];
function getChilds(i, j) {
    return increments.map(inc => {
        return [i + inc[0], j + inc[1]];
    });
}
let area = 0;
let perimeter = 0;
function dfs(i, j, regionLetter, surroundings) {
    /**
     * get all childs
     * if not in visited and is valid child add 1 to area and call dfs on it
     * for all invalid childs add 1 to perimeter
     */
    visited.add(`${i},${j}`);
    const childs = getChilds(i, j);
    childs.forEach(([x, y]) => {
        if (x > -1 && x < rows && y > -1 && y < cols && data[x][y] == regionLetter && !visited.has(`${x},${y}`)) {
            dfs(x, y, regionLetter, surroundings);
            area += 1;
        }
        else if (!(x > -1 && x < rows && y > -1 && y < cols) || data[x][y] != regionLetter) {
            surroundings.add(`${x},${y}`);
            perimeter += 1;
        }
    });
}
console.time("Time");
let result = 0;
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (visited.has(`${i},${j}`)) {
            continue;
        }
        area = 1;
        perimeter = 0;
        const surroundings = new Set();
        dfs(i, j, data[i][j], surroundings);
        // console.log(data[i][j], area, perimeter);
        // console.log();
        result += (area * perimeter);
        // process.exit(0);
    }
}
console.timeEnd("Time");
console.log(result);
