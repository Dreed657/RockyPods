import { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosUtil';

class HealthService {
    HealthCheck(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(`${process.env.REACT_APP_BackEndUrl}/healthcheck`);
    }
}

export default new HealthService();
