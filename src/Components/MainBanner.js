import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const ImageContainer = styled.div`
  position: relative;
  width: 760px;
  height: 480px;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
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
  font-size: 16px;
  font-weight: 300;
  line-height: 25px;
`;

const MainBanner = ({ popular, isMovie }) => {
  const params = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  };
  console.log(popular);
  return (
    <Swiper {...params}>
      {popular
        .filter((item) => item.backdrop_path)
        .map((item) => (
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
                    ? item.overview.substring(0, 80)
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
