import React, { useState, useEffect } from 'react';
import { moviesApi, tvApi } from 'api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from 'Components/Common/Loader';
import Message from 'Components/Common/Message';
import Section from 'Components/Common/Section';
import Poster from 'Components/Common/Poster';
import Contents from 'Components/Detail/Contents';
import DetaileTabs from 'Components/Detail/DetailTabs';

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

const SlideContainer = styled.div`
  padding: 20px;
`;

const DetailContainer = ({ location, history, match }) => {
  const [result, setResult] = useState({});
  const [external, setExternal] = useState({});
  const [credits, setCredits] = useState({});
  const [similar, setSimilar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pathname } = location;
  const isMovie = pathname.includes('/movie/');
  const {
    params: { id },
  } = match;
  const parsedId = parseInt(id);
  const { push } = history;

  const fetchData = async () => {
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    let external = null;
    let credits = null;
    let similar = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.moiveDetail(parsedId));
        ({ data: external } = await moviesApi.external(parsedId));
        ({ data: credits } = await moviesApi.credits(parsedId));
        ({ data: similar } = await moviesApi.similar(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: external } = await tvApi.external(parsedId));
        ({ data: credits } = await tvApi.credits(parsedId));
        ({ data: similar } = await tvApi.similar(parsedId));
      }
    } catch {
      setError('검색결과를 찾지 못했습니다.');
    } finally {
      setResult(result);
      setExternal(external);
      setCredits(credits);
      setSimilar(similar);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    fetchData();
  }, [id]);

  return loading ? (
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
      <Contents result={result} external={external}>
        <DetaileTabs result={result} credits={credits} isMovie={isMovie} />
      </Contents>
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
};
// DetailPresenter.propTypes = {
//   result: PropTypes.object,
//   external: PropTypes.object,
//   credits: PropTypes.object,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.string,
// };
export default DetailContainer;
