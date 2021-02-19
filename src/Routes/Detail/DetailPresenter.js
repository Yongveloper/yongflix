import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import DetaileTaps from 'Routes/Detail/DetailTaps';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
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
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: calc(100vh - 130px);
`;

const Cover = styled.img`
  width: 30%;
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const Imdb = styled.a`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
  background-color: #fcd700;
  color: rgb(20, 20, 20, 1);
  border-radius: 5px;
  padding: 5px;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.1s linear;
`;

const Subtitle = styled.h4`
  font-size: 15px;
`;

const DetailPresenter = ({ result, external, credits, loading, error }) =>
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
        <Cover
          src={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png').default
          }
        />
        <Data>
          <TitleContainer>
            <Title>{result.title ? result.title : result.name}</Title>
            <Imdb
              href={`https://www.imdb.com/title/${external.imdb_id}`}
              target="_blank"
            >
              IMDB
            </Imdb>
          </TitleContainer>

          <Subtitle>{result.tagline && result.tagline}</Subtitle>

          <DetaileTaps result={result} credits={credits} />
        </Data>
      </Content>
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
