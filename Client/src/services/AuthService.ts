import { AxiosResponse } from 'axios';

import axiosInstance from '../utils/axiosUtil';

interface IAuth {
    username: string;
    password: string;
}

class AuthService {
    login(data: IAuth): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`${process.env.REACT_APP_BackEndUrl}/auth/login`, data);
    }

    register(data: IAuth): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`${process.env.REACT_APP_BackEndUrl}/auth/register`, data);
    }

    getProfile(): Promise<AxiosResponse> {
        return axiosInstance.get(`${process.env.REACT_APP_BackEndUrl}/auth/getprofile`);
    }
}

export default new AuthService();
