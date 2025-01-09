import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthState {
    email: string;
    password: string;
}

export interface User {
    id?: string;
    name?: string;
    email?: string;
    role?: number;
    image_url?: string;
    company?: {
        id?: string;
        name?: string;
        email?: string;
    };
}

export interface LoginState {
    email: string;
    password: string;
}

export interface AccessState {
    id_token: string;
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

export interface AuthStoreState {
    auth: AuthState;
    user: User;
    login: LoginState;
    access: AccessState;
    isAuthenticated: boolean;
    isSubscribed: boolean;
    isFreeVersion: boolean;
    notificationSubscriptionId: string;
    logoutAccount: () => void;
    updateTokens: (object: any) => void;
    setUser: (val: any) => void;
    setAuth: (val: any) => void;
    setLogin: (val: any) => void;
    setAccess: (val: any) => void;
    setIsAuthenticated: (val: boolean) => void;
}

const useAuthStore = create<AuthStoreState>()(
    persist(
        (set, get) => ({
            auth: {
                email: "",
                password: "",
            },
            user: {} as User,
            login: {
                email: "",
                password: "",
            },
            access: {
                id_token: "",
                access_token: "",
                expires_in: 0,
                scope: "",
                token_type: ""
            },
            isAuthenticated: false,
            isFreeVersion: false,
            isSubscribed: false,
            notificationSubscriptionId: "",
            setUser: (obj: any) => set({ user: obj }),
            setAuth: (obj: any) => set({ auth: obj }),
            setLogin: (obj: any) => set({ login: obj }),
            setAccess: (obj: any) => set({ access: obj }),
            setIsAuthenticated: (val: boolean) => set({ isAuthenticated: val }),
            updateTokens: (object: any) =>
                set((state) => ({
                    access: {
                        ...state.access,
                        ...object
                    }
                })),
            logoutAccount: () => {
                set({
                    access: {
                        id_token: "",
                        access_token: "",
                        expires_in: 0,
                        scope: "",
                        token_type: ""
                    },
                    login: {
                        email: "",
                        password: "",
                    },
                    auth: {
                        email: "",
                        password: "",
                    },
                    user: {} as User,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: 'authStore',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
