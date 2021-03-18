import React, { useState, useEffect } from 'react';
import { moviesApi } from 'api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Section from 'Components/Common/Section';
import Loader from 'Components/Common/Loader';
import Message from 'Components/Common/Message';
import MainBanner from 'Components/Common/MainBanner';
import Poster from 'Components/Common/Poster';

const Container = styled.div`
  padding: 20px;
`;

const Home = () => {
  const [data, setData] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        setData({ nowPlaying, upcoming, popular });
      } catch {
        setError('영화의 정보를 찾을 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, []);

  const { nowPlaying, upcoming, popular } = data;

  if (loading) return <Loader />;
  console.log(upcoming);
  return (
    <>
      <Helmet>
        <title>영화 | Yongflix</title>
      </Helmet>
      {
        <>
          <MainBanner popular={popular} isMovie={true} />
          <Container>
            <Helmet>
              <title>영화 | Yongflix</title>
            </Helmet>
            {nowPlaying && nowPlaying.length > 0 && (
              <Section title="현재 상영중">
                {nowPlaying.map((movie) => (
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
            {upcoming && upcoming.length > 0 && (
              <Section title="상영 예정">
                {upcoming.map((movie) => (
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
            {popular && popular.length > 0 && (
              <Section title="인기 영화">
                {popular.map((movie) => (
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
            {error && <Message color="#e74c3c" text={error} />}
          </Container>
        </>
      }
    </>
  );
};

export default Home;
