import apiClient from "../utils/apiClient"

export const getAllTagsByCompanyId = async (companyId: any) => {
    try {
        const response = await apiClient.get(`/tag/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};



export const getQuestionsByTagNameAndCompany = async (companyId: any,tagName: any) => {
    try {
        const response = await apiClient.get(`/tag/by-name/${tagName}/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};