import React, { useState, useEffect } from 'react';
import { tvApi } from 'api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import MainBanner from 'Components/MainBanner';
import Poster from 'Components/Poster';

const Container = styled.div`
  padding: 20px;
`;

const TV = () => {
  const [data, setData] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvData = async () => {
      try {
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setData({ topRated, popular, airingToday });
      } catch {
        setError('TV 정보를 찾을 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchTvData();
  }, []);

  const { topRated, popular, airingToday } = data;

  if (loading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>TV | Yongflix</title>
      </Helmet>
      {
        <>
          <MainBanner popular={popular} isMovie={false} />
          <Container>
            {topRated && topRated.length > 0 && (
              <Section title="최고 평점 TV">
                {topRated.map((show) => (
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
            {popular && popular.length > 0 && (
              <Section title="인기 TV">
                {popular.map((show) => (
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
            {airingToday && airingToday.length > 0 && (
              <Section title="현재 방영중">
                {airingToday.map((show) => (
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
          </Container>
        </>
      }
    </>
  );
};

export default TV;
