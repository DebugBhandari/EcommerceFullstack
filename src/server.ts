
import mongoose from 'mongoose';

import app from './app'
import { MONGODB_URI } from './util/secrets'

const baseUrl = process.env.BASE_URL || 'http//localhost:'

const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start Express server
    app.listen(app.get('port'), () => {
      
      console.log(
        '  App is running at %s%d in %s mode',
        baseUrl,
        app.get('port'),
        app.get('env'),
       
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })


