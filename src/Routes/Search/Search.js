import React, { useState } from 'react';
import { moviesApi, tvApi } from 'api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Common/Loader';
import Section from 'Components/Common/Section';
import Message from 'Components/Common/Message';
import Poster from 'Components/Common/Poster';

const Containter = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 50px;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%; ;
`;

const Search = () => {
  const [data, setData] = useState({
    movieResults: null,
    tvResults: null,
  });
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
      setData({ movieResults, tvResults });
    } catch {
      setError('검색 결과가 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const { movieResults, tvResults } = data;

  return (
    <Containter>
      <Helmet>
        <title>검색 | Yongflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="영화 또는 TV 검색..."
          value={searchTerm}
          onChange={upadateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title={`영화 검색 결과: ${movieResults.length}건`}>
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title={`TV 검색 결과: ${tvResults.length}건`}>
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  rating={show.vote_average}
                  year={show.first_air_date}
                />
              ))}
            </Section>
          )}
          {error && <Message color="#e74c3c" text={error} />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message text="검색 결과를 찾을 수 없습니다." color="#95a5a6" />
            )}
        </>
      )}
    </Containter>
  );
};

export default Search;
