import fs from 'fs/promises';

export async function getImagesFromData(dirPath, nameFile) {
    try {
        const files = await fs.readdir(dirPath);

        if (files) {
            const filterFile = files.filter(file => file.startsWith(nameFile));
            return filterFile;
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error; // Re-throw error for other cases
    }
}
