import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import SearchModal from './SearchModal';

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgb(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? '#fff200' : 'transparent')};
  color: ${(props) => (props.current ? '#fff' : '#a5a5a5')};
  transition: border-bottom 0.25s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Search = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default withRouter(({ location: { pathname } }) => {
  const [visible, setVisible] = useState(true);

  const onVisible = () => {
    setVisible((visible) => !visible);
  };

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);

  return (
    <>
      <Header>
        <List>
          <Item current={pathname === '/'}>
            <SLink to="/">영화</SLink>
          </Item>
          <Item current={pathname === '/tv'}>
            <SLink to="/tv">TV</SLink>
          </Item>
          <Item current={pathname === '/search'}>
            <SLink to="/search">검색</SLink>
          </Item>
          <Item>
            <Search onClick={onVisible}>검색창</Search>
          </Item>
        </List>
      </Header>
      {!visible && <SearchModal visible={visible} onVisible={onVisible} />}
    </>
  );
});
