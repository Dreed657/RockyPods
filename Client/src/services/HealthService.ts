import { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosUtil';

const API_URL = 'http://localhost:4000';

class HealthService {
    HealthCheck(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(`${API_URL}/healthcheck`);
    }
}

export default new HealthService();
