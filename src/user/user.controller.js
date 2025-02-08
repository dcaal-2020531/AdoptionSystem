//Lógica de negocio

import User from "./user.model.js"
import { encrypt } from '../../utils/encrypt.js'


export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if (users.length === 0) return res.status(404).send({ message: 'Users not found', success: false })
        return res.send(
            {
                success: true,
                message: 'Users found: ',
                users,
                total: users.length
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}


export const get = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err
            }
        )
    }
}


//update normal  (sin imagenes)

export const updateUser = async (req, res) => {
    try {

        const { id } = req.params
        const update = req.body

        delete update.password

        const updateUser = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true })

        if (!update) return res.status(404).send(
            {
                success: false,
                message: 'Cant Update'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User Updated Successfully',
                user: updateUser
            }
        )



    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err
            }
        )

    }
}

//Update de password

export const updateUserPassword = async (req, res) => {
    try {

        const { id } = req.params
        const { password } = req.body

        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Password is required'
            })
        }

        const encryptedPassword = await encrypt(password)

        const updateUserPassword = await User.findByIdAndUpdate(
            id,
            { password: encryptedPassword },
            { new: true, runValidators: true }
        )
        if (!password) return res.status(404).send(
            {
                success: false,
                message: 'Cant Update password'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Password Updated Successfully'
            }
        )



    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err
            }
        )

    }
}

// eliminar de usuario (cambiar el parametro status)


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User Eliminated',
                user: deleteUser
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err
            }
        )
    }
}

//update imagen 