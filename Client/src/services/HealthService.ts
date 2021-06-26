import { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosUtils';

const API_URL = 'http://localhost:5000';

class HealthService {
    HealthCheck(): Promise<AxiosResponse<any>> {
        return axiosInstance.get(`${API_URL}/healthcheck`);
    }
}

export default new HealthService();
