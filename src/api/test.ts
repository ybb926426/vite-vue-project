import axios from './fetch-api';

export default {
  test: (params: any) => axios.get('test', { params })
}