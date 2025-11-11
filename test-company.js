// Simple test to add a company to the database
const axios = require('axios');

async function testAddCompany() {
  try {
    // You'll need to get a valid token from logging in first
    const token = 'YOUR_AUTH_TOKEN_HERE'; // Replace with actual token
    
    const testCompany = {
      companyName: 'Test Company Inc',
      companyDetails: {
        description: 'A test company for verification'
      },
      yearlyData: [{
        year: 2024,
        package: {
          ctc: 800000,
          currency: 'INR'
        },
        branchesAllowed: ['Computer Science', 'Information Technology'],
        coursesAllowed: ['B.Tech', 'M.Tech'],
        interviewMode: 'Virtual',
        visitDate: new Date('2024-01-15'),
        additionalInfo: {
          jobRole: 'Software Developer',
          jobLocation: ['Bangalore'],
          eligibilityCriteria: {
            minCGPA: 7.0,
            maxBacklogs: 2
          },
          selectionProcess: ['Online Test', 'Technical Interview', 'HR Interview']
        }
      }],
      contactInfo: {
        hrName: 'Test HR',
        hrEmail: 'hr@testcompany.com',
        hrPhone: '+91-9876543210'
      },
      tags: ['IT', 'Product'],
      rating: 4.0
    };

    const response = await axios.post('http://localhost:5000/api/companies', testCompany, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Company created successfully:', response.data);
    
    // Now test getting all companies
    const getResponse = await axios.get('http://localhost:5000/api/companies');
    console.log('All companies:', getResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// testAddCompany();
console.log('Test script ready. Update the token and uncomment the function call to run.');