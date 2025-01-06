import getFile from "../utils/getFile.js";

const input = getFile() || "";

const lines = input.split("\n");

const maxCols = lines[0].length;
const maxRows = lines.length;

function getDiagonalStringsFrom(rowIndex: number, colIndex: number, lines: string[], stringLength: number) {
    const result: string[] = [];
    const incs = [[1, 1], [-1, 1], [-1, -1], [1, -1]];

    for (const inc of incs) {
        let str = "";

        let i = rowIndex;
        let j = colIndex;

        while (str.length < stringLength && i > -1 && i < maxRows && j > -1 && j < maxCols) {

            // console.log(lines[i][j]);

            str = str.concat(lines[i][j])
            i += inc[0]
            j += inc[1]
        }

        result.push(str);
    }

    return result;
}

function getStringsFrom(rowIndex: number, colIndex: number, currentChar: string, lines: string[]) {
    const result: string[] = [];



    if (colIndex + 4 <= maxCols) {
        result.push(lines[rowIndex].slice(colIndex, colIndex + 4))
    }

    if (colIndex - 4 >= -1) {
        result.push(lines[rowIndex].slice(colIndex - 3, colIndex + 1).split("").toReversed().join(""))
    }

    if (rowIndex + 4 <= maxRows) {
        let str = "";

        for (let i = rowIndex; i < rowIndex + 4; i++) {
            str = str.concat(lines[i][colIndex])
        }
        result.push(str)
    }

    if (rowIndex - 4 >= -1) {
        let str = "";

        for (let i = rowIndex; i > rowIndex - 4; i--) {
            str = str.concat(lines[i][colIndex])
        }
        result.push(str)
    }


    const diagonalStrings = getDiagonalStringsFrom(rowIndex, colIndex, lines, 4);
    result.push(...diagonalStrings);

    return result;
}

let count = 0;
console.time("Time")
for (let i = 0; i < maxRows; i++) {
    for (let j = 0; j < maxCols; j++) {
        if (lines[i][j] != "X") {
            continue;
        }

        const strings = getStringsFrom(i, j, lines[i][j], lines);
        const filtered = strings.filter(s => s == "XMAS")
        count += filtered.length;
    }
}
console.timeEnd("Time")
console.log(count);

count = 0;
console.time("Time part 2")
for (let i = 0; i < maxRows; i++) {
    for (let j = 0; j < maxCols; j++) {
        if (lines[i][j] != "A") {
            continue;
        }

        const strings = getDiagonalStringsFrom(i, j, lines, 2);
        if (strings.length < 4 || strings.some(s => s.length != 2)) {
            continue;
        }

        const filtered = strings.filter(s => {
            if (s == "AX" || s == "AA") {
                return true;
            }
        })

        if (filtered.length) {
            continue;
        }

        if (strings[0] == strings[2] || strings[1] == strings[3]) {
            continue;
        }
        
        count += 1;

    }
}
console.timeEnd("Time part 2")
console.log(count);


