import React from 'react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';

const Container = styled.div``;

const ImageFlex = styled.div`
  display: flex;
`;

const Image = styled.img`
  height: 480px;
`;

const MainBanner = ({ popular }) => {
  return (
    <>
      {popular.map((item) => (
        <Image src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
      ))}
    </>
  );
};

export default MainBanner;
