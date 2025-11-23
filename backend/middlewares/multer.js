import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // use cb()
  },
});

export const upload = multer({ storage });
