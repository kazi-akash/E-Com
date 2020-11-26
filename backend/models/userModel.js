import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {   //decrypting password for cheking user login password
  return await bcrypt.compare(enteredPassword, this.password);
 };

userSchema.pre('save', async function (next) { //before saving password its getting encrypted
  if(!this.isModified('password'))  //if password not modified then go to next
  {
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 })

const User = mongoose.model('User', userSchema);

export default User;