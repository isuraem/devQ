// "use client"
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import useAuthStore from './authStore';

// // Create a custom Axios instance
// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add the Authorization header
// apiClient.interceptors.request.use(
//   (config) => {
//     const accessToken = useAuthStore.getState().access.access_token;
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle responses and errors
// apiClient.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     showToast('success', 'Request completed successfully');
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       if (error.response.status === 401) {
//         // Handle unauthorized access, redirect to login
//         showToast('error', 'You are not authorized to access this resource');
//         // Redirect to login page
//         window.location.href = '/login';
//       } 
//       if (error.response.status === 403) {
//         showToast('error', 'You are not authorized to access this resource');
//         // Redirect to login page
//         window.location.href = '/login';
//       }
//       if (error.response.status === 404) {
//         // Handle unauthorized access, redirect to login
//         showToast('error', 'You are not authorized to access this resource');
//         // Redirect to login page
//         window.location.href = '/login';
//       } else if (error.response.status === 500) {
//         // Handle server errors
//         showToast('error', 'An error occurred on the server. Please try again later.');
//       } else {
//         showToast('error', `An error occurred: ${error.response.data.message}`);
//       }
//     } else if (error.request) {
//       // Request was made but no response received
//       showToast('error', 'No response received. Please check your network connection.');
//     } else {
//       // Something happened in setting up the request
//       showToast('error', `An error occurred: ${error.message}`);
//     }

//     return Promise.reject(error);
//   }
// );

// const showToast = (type: 'success' | 'error', message: string) => {
//   const toastOptions = {
//     autoClose: 1000, // Auto close the toast after 1 second
//   };

//   const toastOptions2 = {
//     autoClose: 2000, // Auto close the toast after 1 second
//   };

//   if (type === 'success') {
//     toast.success(message, toastOptions);
//   } else if (type === 'error') {
//     toast.error(message, toastOptions2);
//   }
// };

// export default apiClient;
"use client"
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './authStore';

// Create a custom Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



const showToast = (type: 'success' | 'error', message: string) => {
  // Track the last shown message to avoid duplicates
  let lastShownMessage = '';

  // Dismiss any existing toast
  toast.dismiss();

  // Check if the same success message is already shown
  if (type === 'success' && message === lastShownMessage) {
    return;
  }

  const toastOptions = {
    autoClose: type === 'success' ? 1000 : 2000, // Auto close the toast based on the type
  };

  if (type === 'success') {
    lastShownMessage = message;
    toast.success(message, toastOptions);
  } else if (type === 'error') {
    toast.error(message, toastOptions);
  }
};

// Request interceptor to add the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().access.access_token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses (only 200 status)
    if (response.status === 200) {
      showToast('success', 'Request completed successfully');
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with a status other than 200 range
      switch (error.response.status) {
        case 401:
        case 403:
        case 404:
          showToast('error', 'You are not authorized to access this resource');
          window.location.href = '/login';
          break;
        case 500:
          showToast('error', 'An error occurred on the server. Please try again later.');
          break;
        default:
          showToast('error', `An error occurred: ${error.response.data.message}`);
          break;
      }
    } else if (error.request) {
      // Request was made but no response received
      showToast('error', 'No response received. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      showToast('error', `An error occurred: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

export default apiClient;