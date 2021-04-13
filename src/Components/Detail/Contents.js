import styled from 'styled-components';
import PropTypes from 'prop-types';
import DetaileTabs from './DetailTabs';
import Credits from './Credits';

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
  @media screen and (max-width: 450px) {
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

const Subtitle = styled.h2``;

const Contents = ({ result, external, children }) => (
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
      {children}
    </Data>
  </Content>
);

Contents.propTypes = {
  result: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    tagline: PropTypes.string,
  }),
  external: PropTypes.shape({
    imdb_id: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

export default Contents;
