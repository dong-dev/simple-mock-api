import { MockFile } from "../models/mock-file";
import { getFiles } from "./get-files";
import { readFileSync } from "fs";
export function mockFileLoader(path: string) {
    const fileNameSuffixRegexp = new RegExp(".*\\.mock\\.json$");
    const files = getFiles(path);
    const matchedFiles = (Array.isArray(files) ? files : [files]).filter(f => fileNameSuffixRegexp.test(f));
    const mockFiles: MockFile[] = [];
    for (const filePath of matchedFiles) {
        try {
            const contentBuffer = readFileSync(filePath);
            const content = JSON.parse(contentBuffer.toString());
            const mockFileObject = new MockFile(content);
            mockFiles.push(mockFileObject);
        } catch (error) {

        }
    }
    return mockFiles;
}
