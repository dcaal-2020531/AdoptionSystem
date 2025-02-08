import Appointment from '../appointment/appointment.model.js'



export const test = (req, res) => {
    return res.send({ message: 'Funciona la wea' })
}

//Función para registrar un 
export const save = async (req, res) => {
    try {

        // El usuario autenticado viene desde el middleware
        const user = req.body;
        const data = req.body;

        // Verificar si la mascota ya tiene una cita en esa fecha
        const existingAppointment = await Appointment.findOne({
            pet: data.pet,
            date: data.date
        });

        if (req.body === 'ADMIN') {
            return res.status(400).json({ message: 'ñao ñao' });
        }


        if (existingAppointment) {
            return res.status(400).json({ message: 'This pet already has an appointment on this date' });
        }

        // Verificar si el usuario tiene más de 2 citas el mismo día
        const userAppointments = await Appointment.countDocuments({
            user: data._id,
            date: data.date
        });

        if (userAppointments >= 2) {
            return res.status(400).json({ message: 'You cant have more than 2 appointments on the same day' });
        }

        // Crear la cita con el usuario autenticado
        const appointment = new Appointment({
            ...data,
            user: user._id // Asociamos la cita con el usuario autenticado
        });

        await appointment.save();

        return res.status(201).json({
            message: `Appointment for ${appointment.date} saved successfully`
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error when adding appointment' });
    }
};
