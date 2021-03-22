import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '17603f87d6ac9f83a2905f12c9f181b9',
    language: 'ko-KR',
  },
});

export const moviesApi = {
  nowPlaying: () =>
    api.get('movie/now_playing', {
      params: {
        region: 'KR',
      },
    }),
  upcoming: () =>
    api.get('movie/upcoming', {
      params: {
        region: 'KR',
      },
    }),
  popular: () =>
    api.get('movie/popular', {
      params: {
        region: 'KR',
      },
    }),
  topRated: () =>
    api.get('/movie/top_rated', {
      params: {
        region: 'KR',
      },
    }),
  moiveDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  external: (id) => api.get(`movie/${id}/external_ids`),
  credits: (id) => api.get(`movie/${id}/credits`),
  similar: (id) => api.get(`/movie/${id}/similar`),
  search: (term) =>
    api.get('search/movie', { params: { query: term, region: 'KR' } }),
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  onTheAir: () => api.get('/tv/on_the_air'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  external: (id) => api.get(`tv/${id}/external_ids`),
  credits: (id) => api.get(`tv/${id}/credits`),
  similar: (id) => api.get(`/tv/${id}/similar`),
  search: (term) =>
    api.get('search/tv', {
      params: {
        query: term,
      },
    }),
};
