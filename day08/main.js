import getFile from "../utils/getFile.js";
const input = getFile() || "";
const antennas = new Map();
const data = input.replaceAll("#", ".").split("\n").map(line => line.split(""));
const temp = data.map(row => [...row]);
const rows = data.length;
const cols = data[0].length;
function manhattanDistance(first, second) {
    return [Math.abs(first[0] - second[0]), Math.abs(first[1] - second[1])];
}
function getAntinodes(a, b, rows, cols) {
    const result = [];
    const bShifted = [b[0] - a[0], b[1] - a[1]];
    const bReflection = bShifted.map(n => -n);
    const r1 = [
        bReflection[0] + a[0], bReflection[1] + a[1]
    ];
    result.push(r1);
    const aShifted = [a[0] - b[0], a[1] - b[1]];
    const aReflection = aShifted.map(n => -n);
    const r2 = [
        aReflection[0] + b[0], aReflection[1] + b[1]
    ];
    result.push(r2);
    if (r1[0] > -1 && r1[0] < cols && r1[1] > -1 && r1[1] < rows) {
        console.log(r1);
        const temp1 = getAntinodes(b, r1, rows, cols);
        result.push(...temp1);
    }
    if (r2[0] > -1 && r2[0] < cols && r2[1] > -1 && r2[1] < rows) {
        console.log(r2);
        const temp2 = getAntinodes(a, r2, rows, cols);
        result.push(...temp2);
    }
    // console.log(r1);
    // console.log(r2);
    return result;
}
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == ".") {
            continue;
        }
        if (antennas.has(data[i][j])) {
            antennas.get(data[i][j])?.push([i, j]);
        }
        else {
            antennas.set(data[i][j], [[i, j]]);
        }
    }
}
const antinodes = new Set();
console.time("Part 1");
for (const [key, value] of antennas.entries()) {
    // value.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < value.length - 1; i++) {
        const current = value[i];
        for (let j = i + 1; j < value.length; j++) {
            const anti = getAntinodes(current, value[j], rows, cols);
            // console.log(anti);
            for (const a of anti) {
                if (a[0] > -1 && a[0] < cols && a[1] > -1 && a[1] < rows) {
                    temp[a[0]][a[1]] = "#";
                    antinodes.add(a.join());
                }
            }
            // process.exit(1)
            // if (b[0] > -1 && b[0] < cols && b[1] > -1 && b[1] < rows) {
            //     temp[b[0]][b[1]] = "#"
            //     antinodes.add(b.join())
            // }
        }
    }
    // console.log(key);
    // console.log(antinodes);
}
console.timeEnd("Part 1");
temp.forEach(line => console.log(line.join("")));
console.log(antennas);
console.log(antinodes.size);
