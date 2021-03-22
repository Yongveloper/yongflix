import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 18px;
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

export default BasicInfo;
