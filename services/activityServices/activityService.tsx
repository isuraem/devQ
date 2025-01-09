import apiClient from "../utils/apiClient"

export const getAllActivitiesByCompanyId = async (companyId: any) => {
    try {
        const response = await apiClient.get(`/public-activity/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};


export const getAllPrivateActivitiesByUserId = async (userId: any) => {
    try {
        const response = await apiClient.get(`/private-activity/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};