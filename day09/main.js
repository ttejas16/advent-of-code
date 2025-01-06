import getFile from "../utils/getFile.js";
const input = getFile() || "";
const maxFileId = input.length % 2 == 0 ? Math.floor(input.length / 2) - 1 : Math.floor(input.length / 2);
let left = -1;
let right = input.length % 2 == 0 ? input.length - 2 : input.length - 1;
let result = 0;
let position = 0;
let ascendingId = 0;
let descendingId = maxFileId;
let consumedRight = +input[right];
console.time("Time ");
for (let i = 0; i < input.length; i++) {
    left = i;
    if (left % 2 == 0) {
        // console.log("left ",input[left]);
        let toBeCosumed = -1;
        if (i == right) {
            toBeCosumed = consumedRight;
        }
        else {
            toBeCosumed = (+input[left]);
        }
        for (let j = 0; j < toBeCosumed; j++) {
            // console.log(`${position} * ${ascendingId}`);
            result += (position * ascendingId);
            position += 1;
        }
        ascendingId += 1;
    }
    if ((+input[right]) > (+input[left])) {
        descendingId -= 1;
        right -= 2;
        consumedRight = +input[right];
        position += 1;
    }
    else {
        // console.log("right ",input[right]);
        let j = 0;
        for (j = 0; j < (+input[left]); j++) {
            // console.log(`${position} * ${descendingId}`);
            result += (position * descendingId);
            position += 1;
            consumedRight -= 1;
            if (consumedRight == 0) {
                descendingId -= 1;
                right -= 2;
                consumedRight = +input[right];
                if ((+input[right]) > ((+input[left]) - j)) {
                    descendingId -= 1;
                    right -= 2;
                    consumedRight = +input[right];
                    position += 1;
                }
            }
        }
        // descendingId -= 1;
        // right -= 2;
    }
    if (left >= right) {
        console.log('here');
        break;
    }
}
console.timeEnd("Time ");
console.log(result);
/**
 * ascId
 * descId
 *
 * left
 * if left is even
 *      for j until left
 *          result = (position * ascId)
 *          position += 1
 *      ascId += 1
 * else
 *      j = 0
 *      k = 0
 *      for j until left
 *          result = (position * descId)
 *          position += 1
 *          if j == right
 *              descId -= 1
 *              right -= 2
 *
 * if left <= right break
 *
 *
 *
 *
*/ 
