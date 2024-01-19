/* Work with file storage locally */
import { writeFileSync, readSync, mkdirSync, existsSync} from "fs";
import path from "path";
import { slugify } from "./slugify";


const tmpPath = path.join(__dirname, '../../tmp');

const createDirIfNotExist = (path:string) => {
    if (!existsSync(path)) mkdirSync(path);

    return path;
}


createDirIfNotExist(tmpPath)

export const writeToTmp = (file:File, folder:string = 'resource'):string => {    
    const storageDir = createDirIfNotExist(path.join(tmpPath, folder));

    const filePath = path.join(storageDir, slugify(file.name))

    return filePath
}
