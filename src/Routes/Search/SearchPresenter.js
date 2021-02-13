import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Section from 'Components/Section';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

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

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  searchTerm,
  handleSubmit,
  error,
  upadateTerm,
}) => (
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
          <Section title="영화 검색 결과">
            {movieResults.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV 검색 결과">
            {tvResults.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults &&
          movieResults &&
          tvResults.length === 0 &&
          movieResults.length === 0 && (
            <Message text="검색 결과를 찾을 수 없습니다." color="95a5a6" />
          )}
      </>
    )}
  </Containter>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  upadateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
