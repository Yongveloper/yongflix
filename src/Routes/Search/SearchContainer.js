import React, { useState } from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from 'api';

const SearchContainer = () => {
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== '') {
      searchByterm();
    }
  };

  const upadateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  const searchByterm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch {
      setError('검색 결과가 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      handleSubmit={handleSubmit}
      upadateTerm={upadateTerm}
    />
  );
};

export default SearchContainer;
