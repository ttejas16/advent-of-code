import getFile from "../utils/getFile.js";
const input = getFile() || "";
let stones = input.split(" ").map(n => +n);
function splitEvenly(num) {
    const str = num.toString();
    const mid = Math.floor(str.length / 2);
    const splits = [str.slice(0, mid), str.slice(mid)].map((s) => parseInt(s));
    return splits;
}
let counts = new Map();
for (const stone of stones) {
    if (!counts.has(stone)) {
        counts.set(stone, 0);
    }
    counts.set(stone, counts.get(stone) + 1);
}
function blink(map) {
    const result = new Map();
    for (const [stone, count] of map.entries()) {
        if (stone == 0) {
            // result.set(1, (result.get(1) || 0) + 1)
            if (result.has(1)) {
                result.set(1, result.get(1) + count);
            }
            else {
                result.set(1, count);
            }
        }
        else if (stone.toString().length % 2 == 0) {
            const splits = splitEvenly(stone);
            splits.forEach(split => {
                if (result.has(split)) {
                    result.set(split, result.get(split) + count);
                }
                else {
                    result.set(split, count);
                }
            });
        }
        else {
            if (result.has(stone * 2024)) {
                result.set(stone * 2024, result.get(stone * 2024) + count);
            }
            else {
                result.set(stone * 2024, count);
            }
        }
    }
    return result;
}
for (let i = 0; i < 75; i++) {
    counts = blink(counts);
    // break;
}
const result = [...counts.values()].reduce((acc, c) => acc + c, 0);
console.log(result);
