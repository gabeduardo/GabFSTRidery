const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Por favor añade un correo '],
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: [true, 'Por favor añade una contraseña '],
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash contraseña antes de salvarla
// UserSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcryptjs.hash(user.password, 8);
//   }
//   next();
// });

// // Generar JWT token
// UserSchema.methods.generateAuthToken = function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'yourSecretKey');
//   return token;
// };

// Verificar password
// Método de instancia para verificar la contraseña usando async/await
UserSchema.methods.verifyPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Método estático para obtener un usuario por correo electrónico
UserSchema.statics.getUserByEmail = async function (email) {
  return await this.findOne({ email });
};

UserSchema.statics.createUser = async function (newUser) {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(newUser.password, salt);
  newUser.password = hash;
  const newUserResource = new this(newUser);
  return await newUserResource.save();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
