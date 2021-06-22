import axios from "axios";
import authHeader from '../services/auth.header';

const API_URL = process.env.VUE_APP_API_ENDPOINT + '/api/v1/';

export const getRoles = async () => {
    const state = {
        data: '',
        errored: false,
        response: null,
        errorResponse: '',
        codeStatus: '-1'
    };
    try {
        const response = await axios.get(API_URL + 'roles', {
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