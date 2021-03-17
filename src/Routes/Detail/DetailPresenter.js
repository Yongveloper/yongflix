import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import DetaileTabs from 'Routes/Detail/DetailTabs';
import Section from 'Components/Section';
import Poster from 'Components/Poster';

const Container = styled.div`
  height: calc(100vh - 50px);
  position: relative;
  @media screen and (max-width: 1024px) {
    height: auto;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 20px;
  z-index: 1;
  @media screen and (max-width: 1024px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const CoverContainer = styled.div`
  width: 435px;
  max-width: 435px;
  height: 100%;
  @media screen and (max-width: 400px) {
    width: 200px;
  }
`;

const Cover = styled.img`
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 100%;
  max-width: 60%;
  margin-left: 10px;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
    margin-top: 10px;
    margin-left: 0;
    text-align: center;
  }
`;

const TitleContainer = styled.div`
  height: 10%;
  margin-bottom: 10px;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 32px;
  line-height: 100%;
  margin-bottom: 8px;
`;

const Imdb = styled.a`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
  background-color: #fcd700;
  color: rgb(20, 20, 20, 1);
  border-radius: 5px;
  padding: 0 5px;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.1s linear;
`;

const Subtitle = styled.h2`
  font-size: 15px;
`;

const SlideContainer = styled.div`
  padding: 20px;
`;

const DetailPresenter = ({
  result,
  external,
  credits,
  similar,
  loading,
  error,
  isMovie,
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Yongflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.title ? result.title : result.name}
          {''} | Yongflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <CoverContainer>
          <Cover
            src={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require('../../assets/noPosterSmall.png').default
            }
          />
        </CoverContainer>
        <Data>
          <TitleContainer>
            <Title>
              {result.title ? result.title : result.name}{' '}
              <Imdb
                href={`https://www.imdb.com/title/${external.imdb_id}`}
                target="_blank"
              >
                IMDB
              </Imdb>
            </Title>

            <Subtitle>{result.tagline && result.tagline}</Subtitle>
          </TitleContainer>
          <DetaileTabs result={result} credits={credits} isMovie={isMovie} />
        </Data>
      </Content>
      {similar.results.length > 0 && (
        <SlideContainer>
          <Section title={isMovie ? '비슷한 영화 추천' : '비슷한 TV 추천'}>
            {similar.results.map((item) => (
              <Poster
                key={item.id}
                id={item.id}
                imageUrl={item.poster_path}
                title={isMovie ? item.title : item.name}
                rating={item.vote_average}
                year={isMovie ? item.release_date : item.first_air_date}
                isMovie={isMovie}
              />
            ))}
          </Section>
        </SlideContainer>
      )}
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  external: PropTypes.object,
  credits: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
