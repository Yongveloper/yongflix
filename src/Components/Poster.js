import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.img`
  /* background-image: url(${(props) => props.bgUrl}); */
  width: 180px;
  height: 260px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
  transition: transform 0.2s ease-in-out;
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
  margin-bottom: 5px;
  position: relative;
  &: hover {
    ${Image} {
      transform: scale(1.1);
    }
    ${Image},${DetailText} {
      opacity: 0.3;
    }
    ${Rating},${DetailText} {
      opacity: 1;
    }
  } ;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
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
              : require('../assets/noPosterSmall.png').default
          }
        />
        <DetailText>상세 보기</DetailText>
        <Rating>
          <span role="img" aria-label="rating">
            ⭐
          </span>{' '}
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 12 ? `${title.substring(0, 12)}...` : title}
      </Title>
      <Year>{year ? year.substring(0, 4) : '연도 정보 없음'}</Year>
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
