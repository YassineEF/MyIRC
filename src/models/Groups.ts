import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const groupSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default mongoose.model('Group', groupSchema);


//!Create a group
// User.findOne({name: 'Yassine' })
// .then((rec: any) =>{  
//     const group = new Group({
//       name: "Trompe",
//       createdBy: rec._id,
//     })
//     group.save()
//     .then(() =>  console.log('group crée '))
//     .catch((error: any) => console.log(error));
// })
// .catch((err: any)=>{ console.log(err); });