import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.img`
  width: 240px;
  height: 346px;
  background-size: cover;
  background-position: center center;
  transition: opacity 0.1s linear;
  transition: transform 0.3s ease-in-out;
  @media screen and (max-width: 500px) {
    width: 140px;
    height: 200px;
  }
`;

const DetailText = styled.span`
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 4px 4px 0px 0px;
  &:hover {
    ${Image} {
      transform: scale(1.06);
    }
    ${Image},${DetailText} {
      opacity: 0.5;
    }
    ${Rating},${DetailText} {
      opacity: 1;
    }
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 12px;
  line-height: 16px;
  background-color: rgb(37, 37, 37);
`;

const Title = styled.span`
  display: block;
  font-size: 14px;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require('../../assets/noPosterSmall.png').default
          }
        />
        <DetailText>자세히 보기</DetailText>
        {rating > 0 && (
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>
            {rating}/10
          </Rating>
        )}
      </ImageContainer>
      <TitleContainer>
        <Title>
          {title.length > 12 ? `${title.substring(0, 12)}...` : title}
        </Title>
        <Year>{year ? year.substring(0, 4) : '연도 정보 없음'}</Year>
      </TitleContainer>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imgaUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
