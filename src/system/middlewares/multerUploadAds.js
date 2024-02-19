import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../../uploads/ads'));
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, Date.now() + '-' + fileName);
  },
});

 export const adsUpload = multer({ storage });
