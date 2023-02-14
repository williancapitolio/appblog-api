import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

export const upload = multer({ storage }).single("file");

export function uploadImgMiddleware (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
};
