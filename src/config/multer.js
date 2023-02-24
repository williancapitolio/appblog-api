import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, "./src/uploads/");
        cb(null, "../appblog-spa/public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

export const upload = multer({ storage }).single("file");

export function uploadImgMiddleware(req, res) {
    try {
        const file = req.file;
        res.status(200).json(file.filename);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};
