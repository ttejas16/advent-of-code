import getFile from "../utils/getFile.js";
const input = getFile() || "";
const matches = input.replaceAll("\n", "").matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
const result = [...matches].reduce((acc, match) => {
    const [first, second] = match[0].replaceAll(/[^\d,\d]/g, "").split(",").map(d => +d);
    return acc + (first * second);
}, 0);
console.log("Part 1: ", result);
const regexWithConditions = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const matchesWithConditions = input.replaceAll("\n", "").matchAll(regexWithConditions);
let currentInstruction = null;
const resultPartTwo = [...matchesWithConditions].reduce((acc, match) => {
    if (match[0] == "do()" || match[0] == "don't()") {
        currentInstruction = match[0];
        return acc;
    }
    if (currentInstruction == "don't()") {
        return acc;
    }
    if (currentInstruction == null || currentInstruction == "do()") {
        const [first, second] = match[0].replaceAll(/[^\d,\d]/g, "").split(",").map(d => +d);
        return acc + (first * second);
    }
}, 0);
console.log("Part 2: ", resultPartTwo);
