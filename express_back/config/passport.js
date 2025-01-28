const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport'); // Si necesitas pasar `passport` en la configuración

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'movieratingapplicationsecretkey'; // Reemplaza con tu clave secreta

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      // Aquí puedes hacer una búsqueda en la base de datos para encontrar al usuario con `jwtPayload.id`
      if (jwtPayload.id) {
        // Suponde que el usuario siempre existe para este ejemplo
        return done(null, { id: jwtPayload.id });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = (passport) => {
  passport.use(
    'jwt',
    new JwtStrategy(opts, (jwtPayload, done) => {
      if (jwtPayload.id) {
        return done(null, jwtPayload);
      } else {
        return done(null, false);
      }
    })
  );
};
