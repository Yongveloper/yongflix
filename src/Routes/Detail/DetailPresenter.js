import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

import Slider from 'react-slick';

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
  height: 100%;
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

const Item = styled.span``;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const VideoContainer = styled.div`
  /* width: 480px; */
  height: 300px;
  margin: 0 16px;
`;
const Iframe = styled.iframe`
  width: 450px;
  height: 300px;
`;

const ProductionContainer = styled.div`
  margin-top: 38px;
`;

const ProductionSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const Production = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductionImage = styled.img`
  width: 150px;
  height: 200px;
`;

const CreditsContainer = styled.div`
  margin-top: 38px;
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
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>|</Divider>
            <Item>{result.runtime || result.episode_run_time}분</Item>
            <Divider>|</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.production_countries[0] && (
              <>
                <Divider>|</Divider>
                <Item>{result.production_countries[0].name}</Item>
              </>
            )}
          </ItemContainer>
          <Overview>
            {result.overview ? result.overview : '등록된 소개글이 없습니다.'}
          </Overview>
          {result.videos.results && result.videos.results.length > 0 && (
            <VideoContainer>
              관련 영상
              <Slider {...settings}>
                {result.videos.results.map((video) => (
                  <div
                    style={{
                      width: '480px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Iframe
                      key={video.id}
                      src={`https://www.youtube.com/embed/${video.key}`}
                    ></Iframe>
                  </div>
                ))}
              </Slider>
            </VideoContainer>
          )}
          {result.production_companies &&
            result.production_companies.length > 0 && (
              <ProductionContainer>
                <Slider {...ProductionSettings}>
                  {result.production_companies.map((company) => (
                    <Production>
                      <ProductionImage
                        src={
                          company.logo_path
                            ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                            : require('../../assets/noPosterSmall.png').default
                        }
                      />
                      <Item>{company.name}</Item>
                    </Production>
                  ))}
                </Slider>
              </ProductionContainer>
            )}
          {credits.cast && credits.cast.length > 0 && (
            <CreditsContainer>
              <Slider {...ProductionSettings}>
                {credits.cast.map((cast) => (
                  <Production>
                    <ProductionImage
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                          : require('../../assets/noPosterSmall.png').default
                      }
                    />
                    <Item>{cast.name}</Item>
                    <br />
                    <Item>{cast.character}</Item>
                  </Production>
                ))}
              </Slider>
            </CreditsContainer>
          )}
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
