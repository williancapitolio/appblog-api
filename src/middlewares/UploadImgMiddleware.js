import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

const upload = multer({ storage });

export const UploadImgMiddleware = () => {
    upload.single("file"), function (req, res) {
        const file = req.file;
        res.status(200).json(file.filename)
    };
};
