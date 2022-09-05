import { mockFileLoader } from "../helpers/mock-file-loader";
import { resolve } from "path";
export const mocks = mockFileLoader(resolve(__dirname, "../mocks"));
