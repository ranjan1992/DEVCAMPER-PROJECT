const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Loading models
const Bootcamp = require('./models/Bootcamp');

//Connect to DB

mongoose.connect(process.env.MONGO_URL);

//Read the JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

//Imports into the DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported.......'.green.inverse.bold);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete data

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data Destroyed.......'.red.inverse.bold);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
