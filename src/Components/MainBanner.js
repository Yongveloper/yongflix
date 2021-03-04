import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const ImageContainer = styled.div`
  position: relative;
  width: 760px;
  height: 380px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.6;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 20px;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
`;

const SubTitle = styled.h3`
  margin-top: 12px;
  font-size: 18px;
  font-weight: 300;
  line-height: 25px;
`;

const MainBanner = ({ popular, isMovie }) => {
  const params = {
    slidesPerView: 1,
    spaceBetween: 10,
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
      dynamicBullets: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  };
  console.log(popular);
  return (
    <Swiper {...params}>
      {popular.map((item) => (
        <ImageContainer key={item.id}>
          <Link to={isMovie ? `/movie/${item.id}` : `/show/${item.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            />
          </Link>
          <TitleContainer>
            <Title>{isMovie ? item.title : item.name}</Title>
            <SubTitle>
              {`${
                item.overview
                  ? item.overview.substring(0, 40)
                  : '등록된 소개글이 없습니다'
              }...`}
            </SubTitle>
          </TitleContainer>
        </ImageContainer>
      ))}
    </Swiper>
  );
};

export default MainBanner;
