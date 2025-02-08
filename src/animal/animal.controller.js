//Logica gestion animals

import Animal from './animal.model.js'
import User from "../user/user.model.js"

export const test = (req, res) => {
    return res.send({ message: 'Funciona la wea' })
}



//Función para registrar un animal
export const save = async (req, res) => {
    const data = req.body
    try {
        const user = await User.findOne(
            {
                 _id: data.keeper,
                 role: 'ADMIN'
                }
            )

        if (!user) return res.status(403).send(
            {
                success: false,
                message: 'keeper not found or acces denied'
            }
        )
        const animal = new Animal(data)

        await animal.save()
        return res.send(
            {
                success: true,
                message: `${animal.name} saved successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding animal'
            }
        )
    }
}