import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '17603f87d6ac9f83a2905f12c9f181b9',
    language: 'ko-KR',
  },
});

api.get('tv/popular');

export default api;
