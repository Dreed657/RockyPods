import axios from 'axios';
import tokenUtil from './tokenUtil';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = tokenUtil.getToken();

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            };
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance;
