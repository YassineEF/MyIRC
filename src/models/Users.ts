import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
});
export default mongoose.model('User', userSchema);

//!Comment créer un utilisateur
// const user = new User({
//     name: 'Yassine',
//     password: 'password',
//     isAdmin: true,
//   })
//   user.save()
//   .then(() =>  console.log('Utilisateur créé ! '))
//   .catch((error: any) => console.log(error));