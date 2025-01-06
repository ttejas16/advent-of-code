import getFile from "../utils/getFile.js";
const input = getFile() || "";
let min = Number.MAX_SAFE_INTEGER;
const data = input.split("\n").map(line => {
    let [target, nums] = line.split(": ");
    // console.log(+target);
    if (nums.split(" ").map(n => +n).length < min) {
        min = nums.split(" ").map(n => +n).length;
    }
    return {
        target: parseInt(target, 10),
        nums: nums.split(" ").map(n => +n)
    };
});
function dfs(dataItem, res, index) {
    if (res > dataItem.target) {
        return false;
    }
    if (res == dataItem.target && index == dataItem.nums.length - 1) {
        return true;
    }
    if (index + 1 == dataItem.nums.length) {
        return false;
    }
    const res1 = dfs(dataItem, res + dataItem.nums[index + 1], index + 1);
    if (res1) {
        return true;
    }
    const res2 = dfs(dataItem, res * dataItem.nums[index + 1], index + 1);
    if (res2) {
        return true;
    }
    // just remove below call for part 1
    const res3 = dfs(dataItem, parseInt(`${res}${dataItem.nums[index + 1]}`), index + 1);
    if (res3) {
        return true;
    }
    return false;
}
console.time("Part 2");
const result = data.filter(item => dfs(item, item.nums[0], 0)).reduce((acc, item) => acc + item.target, 0);
console.timeEnd("Part 2");
console.log(result);
// console.log(min);
