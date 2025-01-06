import getFile from "../utils/getFile.js";
const input = getFile() || "";
const orderings = input.split("\n\n")[0].split("\n");
const orderMap = new Map();
for (const order of orderings) {
    const [left, right] = order.split("|").map(n => +n);
    if (orderMap.has(left)) {
        orderMap.get(left)?.add(right);
    }
    else {
        orderMap.set(left, new Set([right]));
    }
}
const updates = input.split("\n\n")[1].split("\n").map(line => line.split(",").map(n => +n));
const correct = [];
const corrected = [];
console.time("Time");
let count = 0;
for (const update of updates) {
    let i = 0;
    for (i = 0; i < update.length; i++) {
        const next = update.slice(i + 1);
        if (next.filter(num => orderMap.get(num)?.has(update[i])).length) {
            break;
        }
    }
    if (i == update.length) {
        count += 1;
        // part 1
        correct.push(update);
    }
    else {
        // part 2
        // correct the update
        const temp = [...update];
        temp.sort((a, b) => {
            if (orderMap.get(b)?.has(a)) {
                return 1;
            }
            return -1;
        });
        corrected.push(temp);
    }
}
let result = correct.reduce((acc, update) => {
    const middle = update[Math.floor(update.length / 2)];
    // console.log(middle);
    return acc + middle;
}, 0);
console.timeEnd("Time");
console.log("Part 1: ", result);
result = 0;
result = corrected.reduce((acc, update) => {
    const middle = update[Math.floor(update.length / 2)];
    // console.log(middle);
    return acc + middle;
}, 0);
console.log("Part 2: ", result);
