import apiClient from "../utils/apiClient"

export const getAllUsersByCompanyId = async (companyId: any) => {
    try {
        const response = await apiClient.get(`/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId: number, name: string, imageUrl: string) => {
    try {
        const body = {
            name: name,
            image_url: imageUrl
        };
        const response = await apiClient.post(`/user/update/${userId}`, body);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};