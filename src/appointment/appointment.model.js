import { Schema, model } from "mongoose";

const appointmentSchema = Schema({
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
    },
    status: {
        type: String,
        required: [true, 'Status required'],
        enum: ['PROGRAMED', 'ONCOURSE', 'CANCELED']
    },
    notes: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
});

    

export default model('Appointment', appointmentSchema)