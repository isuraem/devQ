import apiClient from "../utils/apiClient"


export const createCompany = async (companyData: { name: string; email: string }) => {
    try {
        const response = await apiClient.post('/company', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};


export const getUserDetails = async (userData: { email: string; }) => {
    try {
        console.log("email", userData.email)
        const response = await apiClient.post('/user/find-by-email', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const createUser = async (userData: { name: string; email: string, role: number, company_id: number,position: string}) => {
    try {
        const response = await apiClient.post('/user', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const createNewUser = async (userData: { name: string; email: string, role: number, company_id: number,position: string, password: string}) => {
    try {
        const response = await apiClient.post('/user/new-user', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const updateUser = async (userId: number, updateData: { role: number; position: string }) => {
    try {
      const response = await apiClient.patch(`/user/update/${userId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };