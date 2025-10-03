# Toast Notification System

This project uses `react-hot-toast` for displaying toast notifications throughout the application. The toast system is already configured and ready to use.

## Setup

The toast system is already configured in `src/App.jsx` with custom styling and the necessary utility functions are available in `src/utils/toast.js`.

## Usage

### Import the toast functions

```javascript
import { 
  showSuccess, 
  showError, 
  showInfo, 
  showWarning, 
  showLoading, 
  dismissToast,
  ValidationMessages 
} from '../utils/toast.js';
```

### Basic Toast Types

#### Success Toast
```javascript
showSuccess('Account created successfully!');
```

#### Error Toast
```javascript
showError('Invalid email or password');
```

#### Info Toast
```javascript
showInfo('Please verify your email address');
```

#### Warning Toast
```javascript
showWarning('Your session will expire in 5 minutes');
```

#### Loading Toast
```javascript
const loadingToastId = showLoading('Processing...');
// Later dismiss it
dismissToast(loadingToastId);
```

### Form Validation Examples

#### Login Form Validation
```javascript
const validateLogin = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    showError('Email is required');
    return false;
  }
  
  if (!emailRegex.test(email)) {
    showError(ValidationMessages.INVALID_EMAIL);
    return false;
  }
  
  if (!password.trim()) {
    showError('Password is required');
    return false;
  }
  
  if (password.length < 6) {
    showError(ValidationMessages.INVALID_PASSWORD);
    return false;
  }
  
  return true;
};
```

#### Contact Form Validation
```javascript
const validateContactForm = () => {
  if (!formData.name.trim()) {
    showError('Name is required');
    return false;
  }
  
  if (formData.name.trim().length < 2) {
    showError('Name must be at least 2 characters long');
    return false;
  }
  
  if (!formData.message.trim()) {
    showError('Message is required');
    return false;
  }
  
  if (formData.message.trim().length < 10) {
    showError('Message must be at least 10 characters long');
    return false;
  }
  
  return true;
};
```

### Async Operations with Loading States

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  const loadingToastId = showLoading('Submitting...');
  
  try {
    const response = await api.submitForm(formData);
    dismissToast(loadingToastId);
    showSuccess('Form submitted successfully!');
  } catch (error) {
    dismissToast(loadingToastId);
    showError('Failed to submit form. Please try again.');
  }
};
```

### Pre-defined Validation Messages

The `ValidationMessages` object contains common validation messages:

```javascript
ValidationMessages.INVALID_EMAIL          // 'Please enter a valid email address'
ValidationMessages.INVALID_PASSWORD       // 'Password must be at least 6 characters long'
ValidationMessages.PASSWORD_MISMATCH      // 'Passwords do not match'
ValidationMessages.REQUIRED_FIELD         // 'This field is required'
ValidationMessages.LOGIN_SUCCESS          // 'Login successful! Welcome back.'
ValidationMessages.LOGIN_FAILED           // 'Invalid email or password. Please try again.'
ValidationMessages.SIGNUP_SUCCESS         // 'Account created successfully! Please login.'
ValidationMessages.SIGNUP_FAILED          // 'Failed to create account. Please try again.'
ValidationMessages.LOGOUT_SUCCESS         // 'Logged out successfully'
ValidationMessages.PROFILE_UPDATED        // 'Profile updated successfully'
ValidationMessages.NETWORK_ERROR          // 'Network error. Please check your connection.'
```

## Configuration

The toast system is configured in `src/App.jsx` with the following settings:

- **Position**: Top-right corner
- **Duration**: 4 seconds
- **Custom styling**: Consistent with the application theme
- **Different styles**: For success, error, and loading states

## Components Using Toast

The following components already implement toast notifications:

1. **Login.jsx** - Email/password validation, authentication feedback
2. **Signup.jsx** - Form validation, registration feedback
3. **ContactForm.jsx** - Contact form validation and submission feedback

## Best Practices

1. **Always validate forms** before submission and show specific error messages
2. **Use loading toasts** for async operations to provide user feedback
3. **Dismiss loading toasts** when operations complete
4. **Use pre-defined messages** from `ValidationMessages` for consistency
5. **Keep messages concise** and user-friendly
6. **Use appropriate toast types** (success, error, info, warning) for different scenarios

## Adding Toast to New Components

1. Import the necessary toast functions
2. Add form validation with specific error messages
3. Show loading state during async operations
4. Display success/error messages based on operation results
5. Follow the existing patterns in Login.jsx and Signup.jsx

## Example Implementation

See `src/components/ContactForm.jsx` for a complete example of how to implement toast notifications in a form component.