import mongoose, { mongo } from "mongoose";

const movieSchema = new mongoose.Schema({
    movieId:{type:String,required:true},
    title:{type:String,required:true},
    poster:{type:String}
});
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    watchList:[movieSchema],
    favourites:[movieSchema]
});
const userModel = mongoose.model('user',userSchema);
export default userModel;