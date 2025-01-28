const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();

const mongoURI =
  process.env.MONGO_URI || 'mongodb://mongodb:27017/express_app_charvela'; //quito localhost para poder conectarme a docker

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./config/passport')(passport);
app.use(passport.initialize());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());
// Importar y usar las rutas
const vehicleRoutes = require('./routes/vehicleRoutes');
const userRoutes = require('./routes/userRoutes');
// Agrega más rutas según sea necesario
app.use(vehicleRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const createError = require('http-errors');
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});

module.exports = app;
