# Manual Admin Creation Instructions

Since you don't want to use the seed admin script, here's how to manually create an admin user:

## Method 1: Using MongoDB Compass or MongoDB Shell

1. **Create a student account first:**
   - Go to your signup page
   - Create a regular student account with your desired email and password
   - Complete the registration process

2. **Update the role to admin in MongoDB:**
   
   **Using MongoDB Compass:**
   - Open MongoDB Compass
   - Connect to your database
   - Navigate to the `students` collection
   - Find the user you want to make admin by email
   - Edit the document and change `role: "student"` to `role: "admin"`
   - Save the changes

   **Using MongoDB Shell:**
   ```javascript
   // Connect to your database
   use your-database-name
   
   // Update user role to admin (replace with your email)
   db.students.updateOne(
     { email: "your-admin-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Login with admin role:**
   - Go to login page
   - Select "Admin" role
   - Use the same email and password
   - You'll now have admin access

## Method 2: Create Admin User Programmatically (Optional)

If you want to create an admin user through the signup process:

1. **Modify the signup to allow admin role temporarily:**
   - In your signup form, you could temporarily add admin as an option
   - Create the account with admin role
   - Remove the admin option from signup afterwards

## Method 3: Database Direct Insert

You can also directly insert an admin user into the database:

```javascript
// Example admin user document
{
  "studentName": "System Administrator",
  "email": "admin@manit.ac.in",
  "password": "$2b$12$hashed_password_here", // Use bcrypt to hash your password
  "role": "admin",
  "studentPhone": "9876543210",
  "status": "approved",
  "isActive": true,
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

## Recommended Approach:

1. Register as a student first using the normal signup process
2. Use MongoDB Compass to change the role from "student" to "admin"
3. Login with admin role selected

This approach ensures:
- Password is properly hashed
- All validation is applied
- Database constraints are respected
- Clean admin user creation