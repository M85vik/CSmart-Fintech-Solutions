// File: Verity Finance-backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load all necessary models
const User = require('./models/User');
const Blog = require('./models/Blog');
const Testimonial = require('./models/Testimonial');
const Banner = require('./models/Banner');
const Vehicle = require('./models/Vehicle');

// Load all necessary sample data files
const blogs = require('./data/blogs');
const testimonials = require('./data/testimonials');
const banners = require('./data/banners');
const vehicles = require('./data/vehicles');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Function to import data into the database
const importData = async () => {
  try {
    // 1. Find an admin user
    console.log('Finding admin user...');
    const adminUser = await User.findOne();
    if (!adminUser) {
      console.error('\n❌ ERROR: No admin user found in the database. Please create an admin user before seeding.\n');
      process.exit(1);
    }
    console.log(`Found user: ${adminUser.name}`);

    // Prepare blog data with the admin user as the author
    const sampleBlogs = blogs.map(blog => {
      return { ...blog, author: adminUser._id };
    });

    // 2. Clear all existing data
    console.log('Clearing existing data...');
    await Blog.deleteMany();
    await Testimonial.deleteMany();
    await Banner.deleteMany();
    await Vehicle.deleteMany();
    console.log('Data cleared.');

    // 3. Insert the new sample data
    console.log('Importing new data...');
    await Blog.create(sampleBlogs);
    console.log('-> Blogs imported.');
    await Testimonial.create(testimonials);
    console.log('-> Testimonials imported.');
    await Banner.create(banners);
    console.log('-> Banners imported.');
    await Vehicle.create(vehicles); 
    console.log('-> Vehicles imported.');

    console.log('\n✅ Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error(`\n❌ ERROR DURING DATA IMPORT: ${err}\n`);
    process.exit(1);
  }
};

// Function to destroy all data in the collections
const deleteData = async () => {
  try {
    console.log('Destroying data...');
    await Blog.deleteMany();
    await Testimonial.deleteMany();
    await Banner.deleteMany();
    await Vehicle.deleteMany();
    console.log('\n🔥 Data Destroyed Successfully!');
    process.exit();
  } catch (err) {
    console.error(`\n❌ ERROR DURING DATA DESTRUCTION: ${err}\n`);
    process.exit(1);
  }
};

// Logic to run the correct function based on command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Invalid command. Please run with "-i" to import data or "-d" to destroy data.');
  process.exit();
}