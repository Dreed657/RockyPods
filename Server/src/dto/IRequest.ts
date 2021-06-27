import { Request } from 'express';
import Payload from './IPayload';

type request = Request & Payload;

export default request;
