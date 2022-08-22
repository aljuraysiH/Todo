const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log('Database connection established');
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
