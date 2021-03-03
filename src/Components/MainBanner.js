import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';

const Container = styled.div``;

const ImageContainer = styled.div`
  height: 480px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.75;
`;

const MainBanner = ({ popular, isMovie }) => {
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  console.log(popular);
  return (
    <Swiper {...params}>
      {popular.map((item) => (
        <ImageContainer key={item.id}>
          <Link to={isMovie ? `/movie/${item.id}` : `/show/${item.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            />
          </Link>
        </ImageContainer>
      ))}
    </Swiper>
  );
};

export default MainBanner;
