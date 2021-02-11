import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled.div`
  padding: 0px 20px;
`;

const HomePresenter = ({ nowPlaying, popular, upcoming, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="현재 상영중">
          {nowPlaying.map((movie) => (
            <Poster />
          ))}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="상영 예정">
          {upcoming.map((movie) => (
            <Poster />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="인기 영화">
          {popular.map((movie) => (
            <Poster />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default HomePresenter;
