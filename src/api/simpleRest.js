import axios from "axios";
import authHeader from '../services/auth.header';
import { URL_BACKEND } from '../config/config';

const API_URL = URL_BACKEND + '/api/v1/';

export const getSimpleRest = async () => {
    const state = {
        data: '',
        errored: false,
        response: null,
        errorResponse: '',
        codeStatus: '-1'
    };
    try {
        const response = await axios.get(API_URL + 'restsimple', {
            headers: authHeader()
        });
       
        state.data = await response['data']
        state.codeStatus = '';
      
    }
    catch (error) {
        state.errored = true;
    }
    return state
}