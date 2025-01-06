import getFile from "../utils/getFile.js";
const input = getFile() || "";
const maze = input.split("\n");
const moves = [
    { direction: "right", vector: [0, 1] },
    { direction: "up", vector: [-1, 0] },
    { direction: "left", vector: [0, -1] },
    { direction: "down", vector: [1, 0] },
];
function getChildren(i, j) {
    const childs = moves.map(move => {
        return {
            c: [i + move.vector[0], j + move.vector[1]],
            direction: move.direction
        };
    });
    const validChilds = childs.filter(({ c }) => maze[c[0]][c[1]] != "#");
    return validChilds;
}
const allPaths = [];
function dijkstra(i, j, goal) {
    let queue = [];
    const distances = new Map();
    queue.push({
        i: i,
        j: j,
        score: 0,
        direction: 'right',
        path: new Set([`${i},${j}`])
    });
    while (queue.length > 0) {
        // queue.sort((a,b) => a.score - b.score)
        const res = queue.shift();
        // if (distances.has(`${res.i},${res.j}`) && distances.get(`${res.i},${res.j}`)! < res.score) {
        //     continue;
        // }
        const children = getChildren(res.i, res.j);
        for (const child of children) {
            const key = `${child.c[0]},${child.c[1]}`;
            const score = res.direction != child.direction ? res.score + 1001 : res.score + 1;
            if (maze[child.c[0]][child.c[1]] == goal) {
                // console.log("here");
                allPaths.push({
                    score: score,
                    path: new Set([...res.path, key])
                });
            }
            else if (!res.path.has(key) && score <= 134588) {
                queue.push({
                    i: child.c[0],
                    j: child.c[1],
                    score: score,
                    direction: child.direction,
                    path: new Set([...res.path, key])
                });
            }
            // if (!distances.has(key) || distances.get(key)! >= score) {
            //     distances.set(key, score);
            //     queue.push({
            //         i: child.c[0],
            //         j: child.c[1],
            //         score: score,
            //         direction: child.direction,
            //         path: [...res.path, [...child.c]]
            //     })
            // }
        }
    }
    return distances;
}
function findLetter(letter) {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] == letter) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}
const [i, j] = findLetter('S');
const [I, J] = findLetter('E');
console.time("Time");
const result = dijkstra(i, j, "E");
// const minimum = result.get(`${I},${J}`);
// allPaths.forEach(p => {
//     if (p.score == minimum) {
//         p.path.forEach(v => {
//             placesToSit.add(v.join());
//         })
//     }
// })
console.log(allPaths.map(p => p.score));
console.timeEnd("Time");
