// import mongoose from 'mongoose';
// import { Schema } from 'mongoose';

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   isLogged: {
//     type: Boolean,
//     required: true,
//   },
//   experience: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;

// app/models/UserSchema.js
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLogged: {
    type: Boolean,
    required: true,
    default: false,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;