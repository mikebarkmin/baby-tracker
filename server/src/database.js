import mongoose from 'mongoose';
import bluebird from 'bluebird';
import migrations from './migrations';

mongoose.Promise = bluebird;

function connectDB() {
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.error(
          'Failed to connect to mongo on startup - retrying in 5 sec',
          error
        );
        setTimeout(connectDB, 5000);
      } else {
        migrations.up();
      }
    }
  );
}

export default connectDB;
