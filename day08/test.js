
let a = [0,0];
let b = [1,3];

const d = Math.floor(Math.sqrt((b[0] - a[0])*(b[0] - a[0]) + (b[1] - a[1])*(b[1] - b[1])));

let dx = (b[0]-a[0]) / d
let dy = (b[1]-a[1]) / d

let x3 = b[0] - d * dx
let y3 = b[1] - d * dy

console.log(x3,y3);
