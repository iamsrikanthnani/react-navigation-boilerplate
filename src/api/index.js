import AppConfig from 'react-native-config';
import {store} from 'redux-toolkit/store';

const TIME_OUT = 15000;

const getQueryString = (params) => {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
};

const getFilterString = (filterObject) => {
  return Object.keys(filterObject)
    .map((_key) => `"${_key}":${JSON.stringify(filterObject[`${_key}`])}`)
    .join(',');
};

const fetchData = async (url, options) => {
  let timeOutId;
  try {
    timeOutId = setTimeout(async () => {
      throw new Error('Request time out!');
    }, TIME_OUT);

    const response = await fetch(url, options);
    if (response) {
      if (response?.status < 300) {
        clearTimeout(timeOutId);
        return await response.json();
      }
    }
  } catch (error) {
    throw error;
  }
};

const fetchWrapper = (method) => {
  return async (url, data = null, params = {}) => {
    let URL = url;
    let DATA = data;
    let PARAMS = params;

    URL = AppConfig?.API_URL + URL;
    switch (method) {
      case 'GET':
        PARAMS = DATA;
        if (PARAMS !== null) {
          URL = `${URL}?${getQueryString(PARAMS)}`;
        }
        DATA = null;
        break;

      default:
        DATA = JSON.stringify(DATA);
        break;
    }

    const defaultOptions = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    const {token} = store?.getState().auth;

    if (token) {
      defaultOptions.headers.Authorization = `${token}`;
    }

    if (DATA) {
      defaultOptions.body = DATA;
    }

    const headerOptions = {
      ...defaultOptions,
      headers: {...PARAMS, ...defaultOptions.headers},
    };

    return fetchData(URL, headerOptions);
  };
};

const get = fetchWrapper('GET');
const post = fetchWrapper('POST');
const put = fetchWrapper('PUT');
const patch = fetchWrapper('PATCH');
const del = fetchWrapper('DELETE');

export {get, post, put, patch, del, getFilterString};
