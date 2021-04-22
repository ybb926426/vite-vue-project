import axios from 'axios';
import { message } from 'ant-design-vue';
import route from '../router';

const conf = {
  timeout: 50 * 1000,
  // transformResponse: [function (data) {
  //   // Do whatever you want to transform the data
  //   return JSONbig.parse(data)
  // }],
};

const URL_CONFIG = {
  'dev-production': `/pro`,
  production: `http://47.99.104.103:9988`,
  'dev-staging': `/dev`,
  staging: `http://47.111.241.0:9988`,
  'dev-lrd': `/lrd`,
  'lrd': `http://118.31.171.162:9988`,
  default: `http://47.111.241.0:9988`,
};

const instance = axios.create(conf);

const url = '';

export const apiUrl = url + '/router/rest?method=aqsea.';

const errorHandler = (err: any) => {
  if (!err.response) {
    console.log(err.message)
    if (err.message.indexOf('Network Error') != -1) {
      message.error('网络异常')
    } else {
      message.error(err.message.indexOf('timeout') != -1 ? '服务器响应超时' : '请求被终止');
    }
    return Promise.reject(err);
  }

  const status = err.response.status;
  switch (status) {
    case 400:
      message.error(status + ': 请求错误');
      break;
    case 401:
      message.error(status + ': 未授权，请登录');
      route.push('/login');
      break;
    case 403:
      message.error(status + ': 拒绝访问');
      route.push('/login');
      break;
    case 404:
      message.error(status + `: 请求地址出错: ${err.response.config.url}`);
      break;
    case 408:
      message.error(status + ': 请求超时');
      break;
    case 500:
      message.error(status + ': 服务器内部错误');
      break;
    case 501:
      message.error(status + ': 服务未实现');
      break;
    case 502:
      message.error(status + ': 网关错误');
      break;
    case 503:
      message.error(status + ': 服务不可用');
      break;
    case 504:
      message.error(status + ': 网关超时');
      break;
    case 505:
      message.error(status + ': HTTP版本不受支持');
      break;

    default:
      break;
  }

  return Promise.reject(err);
};

instance.interceptors.request.use((config) => {
  config.url = url + '/router/rest?method=aqsea.' + config.url;
  config.params = {
    v: 'v4',
    ...config.params,
  };

  config.headers['Content-Type'] = 'application/json; charset=UTF-8';

  return config;
});

instance.interceptors.response.use((res) => {
  if (res.data.data) {
    if (res.data.data.is_success === false) {
      message.error(res.data.data.msg || res.data.data.message);
    }
  } else if (res.data.result) {
    if (res.data.result.is_success === false) {
      message.error(res.data.result.sub_msg || res.data.result.msg);
    }
  } else if (res.data.code) {
    if (res.data.code !== '200') {
      message.error(res.data.msg);
    }
  }
  return res.data;
}, errorHandler);

export default instance;
