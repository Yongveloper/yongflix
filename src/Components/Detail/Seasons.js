import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {
  FlexContainerStyle,
  ItemStyle,
  TitleStyle,
  settings,
} from './DetailTabStyleVariable';

const Container = styled.div``;

const Content = styled.div``;

const FlexContainer = styled.div`
  ${FlexContainerStyle}
`;

const Title = styled.div`
  ${TitleStyle}
`;

const Image = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 8px;
`;

const Item = styled.span`
  ${ItemStyle}
`;

const Seasons = ({ result: { seasons } }) => (
  <Container>
    <Title>관련 시리즈</Title>
    <Slider {...settings}>
      {seasons.map((season) => (
        <Content key={season.id}>
          <FlexContainer>
            <Image
              src={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                  : require('../../assets/noPosterSmall.png').default
              }
            />
            <Item>{season.name}</Item>
            <Item>{season.air_date}</Item>
          </FlexContainer>
        </Content>
      ))}
    </Slider>
  </Container>
);

Seasons.propTypes = {
  seasons: PropTypes.arrayOf(PropTypes.object),
};

export default Seasons;
