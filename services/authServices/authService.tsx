import axios from 'axios';
import { getAccessToken } from '../utils/getAccessToken';
import { UserData } from '../../types/auth';
import useAuthStore from '../utils/authStore'; // import useAuthStore
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginWithEmailPassword = async (email: any, password: any) => {
    try {
        const response = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            grant_type: 'password',
            username: email,
            password: password,
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
            client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
            scope: 'openid profile email'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const authResult = response.data;
        useAuthStore.getState().setAccess(authResult);
        console.log("result", authResult)
        // Confirm access token is set
        const accessToken = useAuthStore.getState().access;
        if (accessToken) {
            console.log("Access token is set:", accessToken);
        } else {
            console.log("Access token is not set");
        }
        return authResult;
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.error_description);
            console.error('Auth0 login error:', error.response.data);
        } else if (error.request) {
            toast.error(error.request);
            console.error('No response received:', error.request);
        } else {
            toast.error(error.message);
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

const createUserAndAssignRole = async (userData: UserData, roleId: string) => {
    const token = await getAccessToken();
    console.log("token", token);
    console.log("userData", userData);

    try {
        // Step 1: Create the user
        const userResponse = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // then grab the access token
        let result: any = loginWithEmailPassword(userData.email, userData.password)

        if (result) {
            const userId = userResponse.data.user_id;


            await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
                { roles: [roleId] }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('User created:', roleId);
        }
        else {
            toast.error("Access token is not available after user creation.");
            throw new Error("Access token is not available after user creation.");
        }

        return result;
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error creating user or assigning role:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createNewUserAndAssignRole = async (userData: UserData, roleId: string) => {
    const token = await getAccessToken();
    console.log("token", token);
    console.log("userData", userData);

    try {
        // Step 1: Create the user
        const userResponse = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });


        const userId = userResponse.data.user_id;


        const result = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
            { roles: [roleId] }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('User created:', roleId);



        return result;
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error creating user or assigning role:', error.response ? error.response.data : error.message);
        throw error;
    }
};
//start user role change
const getUserByEmail = async (email: string) => {
    const token = await getAccessToken();
    try {
        const response = await axios.get(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users-by-email`, {
            params: { email },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data[0]; // Assuming the email is unique and returns a single user
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error fetching user by email:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const getUserRoles = async (userId: string) => {
    const token = await getAccessToken();
    try {
        const response = await axios.get(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; // Returns the list of roles assigned to the user
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error fetching user roles:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const removeUserRoles = async (userId: string, roleIds: string[]) => {
    const token = await getAccessToken();
    try {
        await axios.delete(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`, {
            data: { roles: roleIds },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error removing user roles:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const assignUserRole = async (userId: string, roleId: string) => {
    const token = await getAccessToken();
    try {
        const result = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
            { roles: [roleId] }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return result;
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error assigning user role:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const changeUserRoleByEmail = async (email: string, newRoleId: string) => {
    try {
        // Step 1: Get the user by email
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        const userId = user.user_id;

        // Step 2: Get current roles
        const currentRoles = await getUserRoles(userId);

        // Step 3: Remove existing roles
        const currentRoleIds = currentRoles.map((role: any) => role.id);
        if (currentRoleIds.length > 0) {
            await removeUserRoles(userId, currentRoleIds);
        }

        // Step 4: Assign the new role to the user
        const result = await assignUserRole(userId, newRoleId);

        console.log('User role changed:', newRoleId);
        return result;
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error changing user role:', error.response ? error.response.data : error.message);
        throw error;
    }
};
//end user role change

const changeUserPassword = async (email: string, newPassword: string) => {
    try {
        const token = await getAccessToken();
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        const userId = user.user_id;

        const response = await axios.patch(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
            password: newPassword,
            connection: "Username-Password-Authentication"
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Password changed successfully for:', email);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Auth0 API error:', error.response.data);
            toast.error(error.response.data.error || error.response.data.message);
        } else {
            console.error('Error:', error.message);
            toast.error('Failed to change password');
        }
        throw error;
    }
};
export { loginWithEmailPassword, createUserAndAssignRole, createNewUserAndAssignRole, changeUserRoleByEmail, changeUserPassword};