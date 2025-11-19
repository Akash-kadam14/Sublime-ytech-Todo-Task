require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const todoRoutes = require('./routes/todoRoutes');
const isAuthenticate = require('./middlewares/authenticate');

let server;
mongoose.connect(process.env.MONGO_URI).then (()=> {

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb'}));
app.use(bodyParser.json({ limit: '10mb'}));

// const unless = (path, middleware) => (req, res, next) => {
//     if (path.includes(req.path)) {
//       return next();
//     }
//     return middleware(req, res, next);
//   };

  // by pass Authentication for APIs
//   app.use(unless(['/api/auth/regiester', '/api/auth/login'],
//   isAuthenticated));

  app.use('/api/user/', userRoutes);
  app.use('/api/admin/', adminRoute);
  
  app.use(isAuthenticate);
  app.use('/api/todos/', todoRoutes);
  
  const appListenCallBack = async () => {
    try {
      if (process.send && typeof process.send === 'function') { process.send('ready'); }
      console.info(`Server started on port ${port}`);
    } catch (error) {
      console.error(`Server started on port ${port} with error`);
    }
  };

  server = app.listen(port, appListenCallBack);
}).catch((err)=> {
    console.error(err);
    console.error('Database error');
})

const closeServer = (signal) => {
    try {
      // eslint-disable-next-line no-unused-expressions
      server && server.close && typeof server.close === 'function' && server.close();
      console.error('Server closed');
      process.exit(0);
    } catch (e) {
      console.error(`Error while closing server::::${e.message}` || e);
    }
  };


  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    closeServer('uncaughtException');
    });
    
    
    process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
    closeServer('unhandledRejection');
    });
    
    
    process.on('SIGINT', () => closeServer('SIGINT'));
    process.on('SIGTERM', () => closeServer('SIGTERM'));

  // On Connection
  mongoose.connection.on('connected', () => {
    console.info('Connected to database');
  });

  // On Error
  mongoose.connection.on('error', (err) => {
    console.error(err.message);
    console.error('Database error');
  });
