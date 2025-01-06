import getFile from "../utils/getFile.js";

const input = getFile() || "";
const aPushCost = 3;
const bPushCost = 1;

interface Machine {
    a: (x: number, y: number) => [number, number],
    b: (x: number, y: number) => [number, number],
    prize: {
        x: number,
        y: number
    }
}

const machines: Machine[] = input.split("\n\n").map(lines => {
    const [buttonA, buttonB, prize] = lines.split("\n");
    const aIncrements = [...buttonA.matchAll(/\d+/g)].map(d => +d[0]);
    const bIncrements = [...buttonB.matchAll(/\d+/g)].map(d => +d[0]);
    const prizeCoordinates = [...prize.matchAll(/\d+/g)].map(d => +d[0]);

    return {
        a: (x: number, y: number) => [x + aIncrements[0], y + aIncrements[1]],
        b: (x: number, y: number) => [x + bIncrements[0], y + bIncrements[1]],
        prize: {
            x: 10000000000000 + prizeCoordinates[0],
            y: 10000000000000 + prizeCoordinates[1],
        }
    }
});


const map = new Map<string,number>();

function dfs(x: number, y: number, machine: Machine, aPresses: number, bPresses: number) {
    if (map.has(`${x},${y}`)) {
        return map.get(`${x},${y}`);
    }

    // if (aPresses > 100 || bPresses > 100) {
    //     map.set(`${x},${y}`,Infinity);
    //     return Infinity;
    //     // return (aPresses * aPushCost) + (bPresses * bPushCost)
    // }
    
    if (x > machine.prize.x || y > machine.prize.y) {
        map.set(`${x},${y}`,Infinity);
        return Infinity;
        // return (aPresses * aPushCost) + (bPresses * bPushCost)
    }
    
    if (machine.prize.x == x && machine.prize.y == y) {
        map.set(`${x},${y}`,(aPresses * aPushCost) + (bPresses * bPushCost));
        return (aPresses * aPushCost) + (bPresses * bPushCost);
    }

    const aResult = machine.a(x, y);
    const left = dfs(aResult[0], aResult[1], machine, aPresses + 1, bPresses);

    const bResult = machine.b(x, y);
    const right = dfs(bResult[0], bResult[1], machine, aPresses, bPresses + 1);

    map.set(`${x},${y}`,Math.min(left,right));

    return Math.min(left,right);
}

interface Item {
    x:number,
    y:number,
    aPresses:number,
    bPresses:number,
    priority:number
}

function bfs(machine:Machine){

    const queue:Item[] = [];

    queue.push({ x:0,y:0, aPresses:0,bPresses:0,priority:0 });

    while(queue.length > 0){
        queue.sort((a,b) => a.priority - b.priority);
        const res = queue.shift()!;

        if (res.aPresses > 10 || res.bPresses > 10) {
            console.log("here");
            
            continue;
        }

        if (res.x > machine.prize.x || res.y > machine.prize.y) {
            continue;
        }

        if (res.x == machine.prize.x && res.y == machine.prize.y) {
            console.log(res.priority);
            break;
        }

        const aResult = machine.a(res.x, res.y);
        if (aResult[0] <= machine.prize.x && aResult[1] <= machine.prize.y) {
            queue.push({
               x:aResult[0],
               y:aResult[1],
               aPresses: res.aPresses + 1,
               bPresses: res.bPresses,
               priority:  ((res.aPresses + 1) * aPushCost) + (res.bPresses + bPushCost)
            })
        }
        
        const bResult = machine.b(res.x, res.y);
        if (bResult[0] <= machine.prize.x && bResult[1] <= machine.prize.y) {
            queue.push({
                x:bResult[0],
                y:bResult[1],
                aPresses: res.aPresses ,
                bPresses: res.bPresses + 1,
                priority:  (res.aPresses * aPushCost) + ((res.bPresses + 1) + bPushCost)
             })
        }



    }
}

console.time("Time")
const result = machines.reduce((acc,machine) => {
    const cost = dfs(0,0,machine,0,0);
    map.clear();
    
    if (cost == Infinity) {
        return acc + 0;
    }
    // console.log(cost);
    
    return acc + cost;
},0);
console.timeEnd("Time")

console.log(result);
