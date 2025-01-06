import getFile from "../utils/getFile.js";
const input = getFile() ?? "";
const verifiers = {
    "increasing": (a, b) => (b - a) > 0 && (b - a) <= 3 ? true : false,
    "decreasing": (a, b) => (a - b) > 0 && (a - b) <= 3 ? true : false,
};
const levels = input.split("\n").map(line => {
    const result = {
        level: [],
        levelType: null,
        safe: false
    };
    const level = line.split(" ").map(num => +num);
    const firstTwo = level.slice(0, 2);
    if (firstTwo[0] < firstTwo[1]) {
        result.levelType = "increasing";
    }
    else if (firstTwo[0] > firstTwo[1]) {
        result.levelType = "decreasing";
    }
    result.level = level;
    return result;
});
// console.log(levels);
levels.forEach(obj => {
    if (!obj.levelType) {
        return false;
    }
    const f = verifiers[obj.levelType];
    for (let i = 1; i < obj.level.length; i++) {
        if (!f(obj.level[i - 1], obj.level[i])) {
            return false;
        }
    }
    // add obj.safe = true because we can use that in part 2
    obj.safe = true;
});
// part 1
const safeLevels = levels.filter(obj => obj.safe);
console.time("Time");
const safeLevels2 = levels.filter(obj => {
    if (obj.safe) {
        return true;
    }
    for (let i = 0; i < obj.level.length; i++) {
        const newLevel = [...obj.level].filter((_, index) => index != i);
        let f = null;
        if (newLevel[0] < newLevel[1]) {
            f = "increasing";
        }
        else if (newLevel[0] > newLevel[1]) {
            f = "decreasing";
        }
        else {
            continue;
        }
        const vf = verifiers[f];
        let j = 1;
        for (j = 1; j < newLevel.length; j++) {
            if (!vf(newLevel[j - 1], newLevel[j])) {
                break;
            }
        }
        if (j == newLevel.length) {
            return true;
        }
    }
    return false;
});
console.timeEnd("Time");
console.log(safeLevels2.length);
