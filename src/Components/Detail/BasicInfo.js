import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  font-size: 18px;
  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;

const Item = styled.span``;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  opacity: 0.7;
  line-height: 1.5;
`;

const BasicInfo = ({ result }) => (
  <Container>
    <ItemContainer>
      <Item>
        {result.release_date
          ? result.release_date.substring(0, 4)
          : result.first_air_date.substring(0, 4)}
      </Item>
      <Divider>|</Divider>
      {result.runtime || result.episode_run_time ? (
        <>
          <Item>{result.runtime || result.episode_run_time}분</Item>
          <Divider>|</Divider>
        </>
      ) : null}

      <Item>
        {result.genres &&
          result.genres.map((genre, index) =>
            index === result.genres.length - 1 ? genre.name : `${genre.name} / `
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
  </Container>
);

BasicInfo.propTypes = {
  results: PropTypes.shape({
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    runtime: PropTypes.number,
    episode_run_time: PropTypes.number,
    genres: PropTypes.object,
    production_countries: PropTypes.arrayOf(PropTypes.object),
    overview: PropTypes.string,
  }),
};

export default BasicInfo;
