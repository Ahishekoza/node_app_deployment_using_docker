import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    timestamps: true,
})

export const UserSchema = mongoose.model('users',userSchema)