import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        name: Joi.string().required().min(1).max(50).trim(),
        workPlace: Joi.string().min(10).max(256).trim(),
        phone: Joi.string().required().min(10).max(50).trim(),
        email: Joi.string().required().min(10).max(50).trim(),
        address: Joi.string().required().min(10).max(256).trim(),
        status: Joi.string().required().min(5).max(50).trim(),
        description: Joi.string().min(3).max(256).trim()
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
        name: Joi.string().required().min(1).max(50).trim(),
        workPlace: Joi.string().min(10).max(256).trim(),
        phone: Joi.string().required().min(10).max(50).trim(),
        email: Joi.string().required().min(10).max(50).trim(),
        address: Joi.string().required().min(10).max(256).trim(),
        status: Joi.string().required().min(5).max(50).trim(),
        description: Joi.string().min(3).max(256).trim()
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

export const DoctorValidation = {
    createNew,
    update
}
