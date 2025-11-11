import mongoose from 'mongoose';
import Companies from './models/Comapnies.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/major-project');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const testDatabase = async () => {
  await connectDB();
  
  try {
    console.log('Testing database queries...\n');
    
    // Get all companies without any filters
    const allCompanies = await Companies.find({});
    console.log(`Total companies in database: ${allCompanies.length}`);
    
    if (allCompanies.length > 0) {
      console.log('\nFirst company:');
      console.log(JSON.stringify(allCompanies[0], null, 2));
      
      console.log('\nAll company names and isActive status:');
      allCompanies.forEach((company, index) => {
        console.log(`${index + 1}. ${company.companyName} - isActive: ${company.isActive}`);
      });
    }
    
    // Test with isActive filter
    const activeCompanies = await Companies.find({ isActive: true });
    console.log(`\nActive companies: ${activeCompanies.length}`);
    
    const inactiveCompanies = await Companies.find({ isActive: false });
    console.log(`Inactive companies: ${inactiveCompanies.length}`);
    
    const undefinedActiveCompanies = await Companies.find({ isActive: { $exists: false } });
    console.log(`Companies without isActive field: ${undefinedActiveCompanies.length}`);
    
  } catch (error) {
    console.error('Error testing database:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

testDatabase();