import { appendFileSync, writeFileSync } from "fs";
import getFile from "../utils/getFile.js";

const input = getFile() || "";

const data = input.split("\n\n");

const warehouse = data[0].split("\n").map(line => line.split(""));
const directions = data[1];

const expandedWarehouse:string[][] = [];
for(let i = 0;i < warehouse.length;i++){
    expandedWarehouse.push([]);
}

for (let i = 0; i < warehouse.length; i++) {
    for (let j = 0; j < warehouse[i].length; j++) {
        if (warehouse[i][j] == "@") {
            expandedWarehouse[i].push("@",".");
        }
        else if(warehouse[i][j] == "O"){
            expandedWarehouse[i].push("[","]");
        }
        else{
            expandedWarehouse[i].push(warehouse[i][j],warehouse[i][j]);
        }
        
    }
}

expandedWarehouse.forEach(arr => {
    appendFileSync("expanded_input.txt",arr.join("") + "\n");
})
appendFileSync("expanded_input.txt","\n");
appendFileSync("expanded_input.txt",directions);
