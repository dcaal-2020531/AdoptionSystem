import { Schema,model } from "mongoose";

const animalSchema = Schema({
    name:{

        type:String,
        maxLenth:[35, 'Cant be over 35 characters'],
        require:[true, 'Name is required']
    },
    description:{
        type: String,
        required:[true, 'Description is required']
    },
    age:{
        type:String,
        maxLength:[10,`Can't be overcome 10 characters`],
        required:[true, 'Age is required']
    },
    type:{
        type: String,
        uppercase: true,
        required:[true, 'Type is required']

    },
    keeper:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Boolean,
        default: true,
        required:[true, 'Status is required']
    }
},{
    versuionKey: false, //Deshabilida el __v(version del documento),
    timestamps: true //Agrega propiedades por fecha
})
    

export default model('Animal', animalSchema)