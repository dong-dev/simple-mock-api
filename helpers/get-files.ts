import { resolve } from "path";
import { readdirSync } from "fs";
/**
 * get files inside directory recursively
 * @param dir directory to lookup
 * @returns List of files
 */
export function getFiles(dir: string): string[] | string {
    const dirents = readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return files.flat();
}

// source: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
