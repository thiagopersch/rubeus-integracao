import * as session from 'express-session';

export const sessionConfig = session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Defina como true se você estiver usando HTTPS
});
