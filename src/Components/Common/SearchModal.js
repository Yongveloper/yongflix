import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import Search from '../../Routes/Search';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import searchImg from '../../assets/search.png';

const ModalMask = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
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
`;

const ModalWarpper = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  width: 820px;
  margin: 100px auto 0;
  position: relative;
`;

const SMdClose = styled(MdClose)`
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
  overflow: hidden;
`;

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  height: 51px;

  background: url(${searchImg}) no-repeat 0;
  font-size: 28px;
  color: #fff;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid #2f2f2f;
  padding-left: 40px;
  outline: 0;
`;

const SearchModal = ({ visible, onVisible }) => {
  const { history, location } = useReactRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      alert('검색어를 입력해주세요.');
      return;
    }
    onVisible();
    setSearchTerm('');
    if (location.pathname !== '/search') {
      history.push('/search');
    }
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchTerm(value);
  };

  return (
    <ModalMask visible={visible}>
      <ModalWarpper visible={visible}>
        <SMdClose onClick={() => onVisible()} />
        <ModalContainer>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="검색어를 입력하세요."
              value={searchTerm}
              onChange={handleChange}
            />
          </Form>
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
