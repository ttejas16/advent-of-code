import { existsSync, readFileSync } from "fs";
function getFile() {
    if (process.argv.length < 3) {
        console.log("Expected a file name as a command line argument");
        return;
    }
    if (!existsSync(process.argv[2])) {
        console.log(`${process.argv[2]} does not exists!`);
        return;
    }
    return readFileSync(process.argv[2], "utf-8");
}
export default getFile;
