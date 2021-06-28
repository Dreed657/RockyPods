import { AxiosResponse } from 'axios';

import axiosInstance from '../utils/axiosUtil';

const API_URL = 'http://localhost:5000';

interface IAuth {
    username: string;
    password: string;
}

class AuthService {
    login(data: IAuth): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`${API_URL}/auth/login`, data);
    }

    register(data: IAuth): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`${API_URL}/auth/register`, data);
    }

    getProfile(): Promise<AxiosResponse> {
        return axiosInstance.get(`${API_URL}/auth/getprofile`);
    }
}

export default new AuthService();
