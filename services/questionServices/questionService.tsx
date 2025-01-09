import apiClient from "../utils/apiClient"
interface QuestionData {
    title: string;
    description: string;
    user_id: number;
    status: boolean;
    tags: string[];
}

interface AnswerData {
    answer_text: string;
    question_id: string;
    user_id: string;
}

interface DeleteAnswerData {
    id: string;
}

export const createQuestion = async (questionData: QuestionData) => {
    try {
        const response = await apiClient.post('/question', questionData);
        return response.data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

export const getAllQuestionByUserId = async (userId: any) => {
    try {
        const response = await apiClient.get(`/question/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};


export const getQuestionById = async (questionId: any) => {
    try {
        const response = await apiClient.get(`/question/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const createAnswer = async (answerData: AnswerData) => {
    try {
        const response = await apiClient.post('/answer', answerData);
        return response.data;
    } catch (error) {
        console.error('Error creating answer:', error);
        throw error;
    }
};

export const deleteAnswerById = async (deleteAnswerID: any) => {
    try {
        const response = await apiClient.delete(`/answer/${deleteAnswerID}`);
        return response.data;
    } catch (error) {
        console.error('Error creating answer:', error);
        throw error;
    }
};

export const likeAQuestion = async (userId: any, questionId: any) => {
    try {
        const response = await apiClient.post(`/question-like/${userId}/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating answer:', error);
        throw error;
    }
};

export const unlikeAQuestion = async (userId: any, questionId: any) => {
    try {
        const response = await apiClient.delete(`/question-like/${userId}/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating answer:', error);
        throw error;
    }
};

export const getAllQuestionRelateToUserId = async (userId: any) => {
    try {
        const response = await apiClient.get(`/question/one-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};