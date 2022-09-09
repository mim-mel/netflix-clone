import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavBlock show={show}>
      <NavLogo
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={() => window.location.reload()}
      />
      <NavAvatar
        src="https://i.pinimg.com/564x/0c/91/71/0c9171ce965fb4ec175c2b001516e754.jpg"
        alt="User Logged"
      />
    </NavBlock>
  );
};

const Wrab = styled.div`
  height: 2000px;
`;

const NavBlock = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  background: ${(props) => props.show && "black"};
`;

const NavBlack = styled.div`
  background-color: #111;
`;

const NavLogo = styled.img`
  width: 120px;
  position: fixed;
  left: 40px;
  object-fit: contain;
`;

const NavAvatar = styled.img`
  width: 35px;
  position: fixed;
  right: 40px;
  object-fit: contain;
`;

export default Nav;
