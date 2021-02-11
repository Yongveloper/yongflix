import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Section from 'Components/Section';

const Containter = styled.div`
  padding: 0px 20px;
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
              <span key={movie.id}>{movie.title}</span>
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV 검색 결과">
            {tvResults.map((show) => (
              <span key={show.id}>{show.title}</span>
            ))}
          </Section>
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
