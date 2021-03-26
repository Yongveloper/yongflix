import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import searchImg from '../../assets/search.png';

const boxFade = keyframes`
  from {
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
`;

const ModalMask = styled.div`
  display: ${(props) => (props.visible ? 'none' : 'block')};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${boxFade} 0.2s ease;
`;

const ModalWarpper = styled.div`
  position: relative;
  top: 10%;
  width: 820px;
  margin: auto;
  @media screen and (max-width: 890px) {
    width: 80%;
  }
`;

const ModalCloseBtn = styled(MdClose)`
  position: absolute;
  right: -36px;
  top: 0;
  font-size: 30px;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 548px;
  padding: 40px 70px 0;
  background-color: #252525;
  border-radius: 8px;
  @media screen and (max-width: 480px) {
    padding: 20px 30px;
  }
`;

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  height: 50px;
  background: url(${searchImg}) no-repeat 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 28px;
  color: #fff;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #2f2f2f;
  padding-left: 40px;
  outline: 0;
  &:focus {
    border-bottom-color: #fff;
  }

  @media screen and (max-width: 580px) {
    font-size: 18px;
  }
`;

const ResentContainer = styled.div`
  padding-top: 30px;
  color: #a5a5a5;
`;

const ResentTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
`;

const SearchedList = styled.ul`
  height: 360px;
  overflow-y: auto;
`;

const SearchedItem = styled.li`
  margin-bottom: 12px;
  &:hover {
    color: #fff;
  }
`;

const SearchModal = ({ visible, onVisible }) => {
  const { history } = useReactRouter();
  const [term, setTerm] = useState('');
  const [searched, setSearched] = useState(
    JSON.parse(localStorage.getItem('saveHistory')) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term) {
      alert('검색어를 입력해주세요.');
      return;
    }
    setSearched([...searched, term]);
    setTerm('');
    onVisible();
    history.push(`/search/${term}`);
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setTerm(value);
  };

  useEffect(() => {
    localStorage.setItem('saveHistory', JSON.stringify(searched));
  }, [searched]);

  return (
    <ModalMask visible={visible}>
      <ModalWarpper>
        <ModalCloseBtn onClick={onVisible} />
        <ModalContainer>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="검색어를 입력하세요."
              value={term}
              onChange={handleChange}
            />
          </Form>
          <ResentContainer>
            <ResentTitle>최근 검색어</ResentTitle>
            <SearchedList>
              {searched.length > 0
                ? searched.map((item, i) => (
                    <Link to={`/search/${item}`} onClick={onVisible}>
                      <SearchedItem key={i}>{item}</SearchedItem>
                    </Link>
                  ))
                : '최근 검색어가 없습니다.'}
            </SearchedList>
          </ResentContainer>
        </ModalContainer>
      </ModalWarpper>
    </ModalMask>
  );
};

SearchModal.propTypes = {
  visible: PropTypes.bool,
  onVisible: PropTypes.func,
};

export default SearchModal;
