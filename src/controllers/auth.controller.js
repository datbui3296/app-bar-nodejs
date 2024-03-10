
const { HttpStatusCode } = require("../../src/utilities/constants");
const AuthService = require("../../src/services/auth.service");
const AuthModel = require("../models/user.model");
const ms = require("ms");
const path = require("path")
const fs = require("fs")

const register = async (req, res) => {
    try {
        const result = await AuthService.register(req.body)
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message, data: result?.data })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const verify = async (req, res) => {
    try {
        const result = await AuthService.verifyToken(req.params)
        //result.password = null
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const result = await AuthService.login(req.body)

        // xử lý cookie ở đây
        res.cookie('accessToken', result.data.AccessToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('refreshToken', result.data.RefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('_id', result.data.UserId, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        // Xoá cookie
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.clearCookie('_id')

        res.status(HttpStatusCode.OK).json({
            stt: true,
            msg: 'Logout successfully'
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const result = await AuthService.refreshToken(req, res)
        if (result.status == HttpStatusCode.NOT_FOUND) {
            return res.status(HttpStatusCode.NOT_FOUND).json(result)
        } else if (result.status == HttpStatusCode.EXPIRED) {
            return res.status(HttpStatusCode.REFRESH_EXPIRED).json(result)
        }

        // xử lý cookie ở đây
        res.cookie('accessToken', result.data.AccessToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('refreshToken', result.data.RefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })
        res.cookie('_id', result.data.UserId, { httpOnly: true, secure: true, sameSite: 'none', maxAge: ms('12 days') })

        return res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}


const update = async (req, res) => {
    try {
        const userId = req.jwtDecoded._id
        const userAvatarFile = req.file
        const result = await AuthService.update(userId, req.body, userAvatarFile)

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const updateAvatar = async (req, res) => {
    try {
        // const userId = req.jwtDecoded._id
        // const result = await AuthService.update(userId, req.body)
        //console.log(req)
        res.status(HttpStatusCode.OK).json({})
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        let result = await AuthService.getUserById(id)
        res.status(HttpStatusCode.OK).json({ result })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {

        let result = await AuthService.forgotPassword(req)
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }

}

const resetPassword = async (req, res) => {
    try {

        let result = await AuthService.resetPassword(req)
        return res.status(!result.status ? HttpStatusCode.OK : result.status).json({ message: result?.message })

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }

}

module.exports = {
    register,
    verify,
    login,
    logout,
    refreshToken,
    update,
    updateAvatar,
    getUserById,
    forgotPassword,
    resetPassword
}
