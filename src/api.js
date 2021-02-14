import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '17603f87d6ac9f83a2905f12c9f181b9',
    language: 'ko-KR',
  },
});

export const moviesApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  moiveDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  external: (id) => api.get(`movie/${id}/external_ids`),
  search: (term) =>
    api.get('search/movie', {
      params: {
        query: term,
      },
    }),
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  external: (id) => api.get(`tv/${id}/external_ids`),
  search: (term) =>
    api.get('search/tv', {
      params: {
        query: term,
      },
    }),
};
