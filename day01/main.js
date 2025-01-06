import getFile from "../utils/getFile.js";
const input = getFile() ?? "";
console.time("Time");
const left = [];
const right = [];
input.split("\n").forEach(line => {
    const [l, r] = line.split("   ");
    left.push(+l);
    right.push(+r);
});
left.sort((a, b) => a - b);
right.sort((a, b) => a - b);
let result = 0;
for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i]);
}
// part 1
// console.log(result);
result = 0;
const counts = {};
right.forEach(num => {
    if (!counts[num]) {
        counts[num] = 1;
    }
    else {
        counts[num] += 1;
    }
});
left.forEach(num => {
    if (counts[num]) {
        result += (num * counts[num]);
    }
});
console.timeEnd("Time");
// part 2
console.log(result);
