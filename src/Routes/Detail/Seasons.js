import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Container = styled.div``;

const Content = styled.div``;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-left: 10px;
  margin-bottom: 20px;
  + div {
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 8px;
`;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Seasons = ({ result }) => (
  <Container>
    <Title>시리즈</Title>
    <Slider {...settings}>
      {result.seasons.map((season) => (
        <Content>
          <FlexContainer>
            <Image
              src={
                season.poster_path
                  ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                  : require('../../assets/noPosterSmall.png').default
              }
            />
            {season.name}
            {season.air_date}
          </FlexContainer>
        </Content>
      ))}
    </Slider>
  </Container>
);

export default Seasons;
