

const Joi = require('joi')
const {HttpStatusCode} = require('../utilities/constants')
const { USERNAME_RULE, EMAIL_RULE, PASSWORD_RULE }  = require('../utilities/validators')

const register = async (req, res, next) => {
    const condition = Joi.object({
        // Email: Joi.string().pattern(EMAIL_RULE).message('Email is invalid').trim(),
        Password: Joi.string().required().trim(),
        DisplayName: Joi.string().required().trim(),
        Phone: Joi.string().required().trim(),
        BirthDate: Joi.date().required(),
        Role: Joi.string()
        /**
        * Custom messsage với thằng Joi.ref khá khó tìm trong docs, cách tìm là bắt keyword để tìm những người từng hỏi chung 1 vấn đề,
        * Ví dụ như link bên dưới, tìm ra cách custom bằng any.only trong hàm messages(json object)
        * https://github.com/sideway/joi/issues/2147#issuecomment-537372635
        * Lưu ý ở đầy có thể dùng password_confirmation: Joi.ref('password') luôn nhưng chưa tìm ra cách custom message, toàn lỗi :))
        *
        * Ngoài ra đây là để học cách custom message nhé, còn thực tế ở FE chúng ta đã validate đẹp rồi, thì thông thường BE cứ để default message trả về
        * trường hợp nào thật sự cần làm đẹp message thì mới làm nhé
        */
        // password_confirmation: Joi.string().required().valid(Joi.ref('password')).messages({
        //     'any.only': 'Password Confirmation is not match',
        //     'any.required': 'Password Confirmation is required'
        // })
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        console.log('345')
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message
        })
    }
}

const verify = async (req, res, next) => {
    const condition = Joi.object({
        email: Joi.string().required().pattern(EMAIL_RULE).message('Email is invalid').trim(),
        verifyToken: Joi.string().required()
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message
        })
    }
}

const login = async (req, res, next) => {
    const condition = Joi.object({
        Phone: Joi.string().required().trim(),
        Password: Joi.string().required().trim()
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message
        })
    }
}

const update = async (req, res, next) => {
    const condition = Joi.object({
        displayName: Joi.string().trim(),
        currentPassword: Joi.string().pattern(PASSWORD_RULE).message('Current Password is invalid'),
        newPassword: Joi.string().pattern(PASSWORD_RULE).message('New Password is invalid')
    })
    try {
        await condition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
        })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message
        })
    }
}




module.exports  = {
    register,
    verify,
    login,
    update
}
