import fs from "fs";

export const readFileByLine = (filePath: string): string[] => {
    return fs
        .readFileSync(filePath)
        .toString()
        .split("\n")
        .filter(Boolean);
}