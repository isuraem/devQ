import axios from 'axios';

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/`,
      grant_type: 'client_credentials'
    });
    
    return response.data.access_token;
  } catch (error: any) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};