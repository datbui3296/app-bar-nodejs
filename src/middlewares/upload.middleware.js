import multer from 'multer'

export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']

//Kiểm tra loại file nào được chấp nhận
const fileFilter = (req, file, cb) => {
    if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
        const errMessage = 'File type not allowed'
        return cb(errMessage, null)
    }
    return cb(null, true)
}
// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Định nghĩa nơi file upload sẽ được lưu lại
        callback(null, 'src/uploads/')
    },
    filename: (req, file, callback) => {
        // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
        // Mình ví dụ chỉ cho phép tải lên các loại ảnh png & jpg
        let math = ['image/png', 'image/jpeg']
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`
            return callback(errorMess, null)
        }
        // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
        let filename = `${Date.now()}-khanv-${file.originalname}`
        callback(null, filename)
    }
})
const upload = multer({
    limits: {
        fileSize: LIMIT_COMMON_FILE_SIZE,
        files: 1
    },
    fileFilter: fileFilter,
    //storage: diskStorage
})

export const UploadMiddleware = {
    upload
}