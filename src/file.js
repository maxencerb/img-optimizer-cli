import fs from 'fs';

/**
 * Creates a directory if it doesn't exist
 * @param {String} dir 
 */
export function createDirIfNotExist(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}