import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {

  const Modalref = useRef();

  useOnClickOutside(Modalref,()=>{
    setModalOpen(false)
  });

  return (
    <Presentation>
      <ModalWrap>
        <Modal ref={Modalref}>
          <ModalClose onClick={() => setModalOpen(false)}>x</ModalClose>
          <ModalPoster
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-poster-img"
          />
          <ModalContent>
            <ModalDetails>100% for you</ModalDetails>
            {release_date ? release_date : first_air_date}
            <ModalTitle>{title ? title : name}</ModalTitle>
            <ModalOverView>평점 : {vote_average}</ModalOverView>
            <ModalOverView>{overview}</ModalOverView>
          </ModalContent>
        </Modal>
      </ModalWrap>
    </Presentation>
  );
};

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const Presentation = styled.div`
  z-index: 1200;
  position: absolute;
`;

const ModalWrap = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgb(0 0 0 / 71%);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;

  @media screen and (max-height: 768px) {
    align-items: unset;
    padding: 0;
    padding-top: 2rem;
  }
`;

const Modal = styled.div`
  position: relative;
  margin: auto auto;
  max-height: 800px;
  max-width: 900px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} fadeIn 400ms;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
    visibility: hidden;
  }

  @media screen and (max-height: 768px) {
    overflow-y: scroll !important;
  }
`;

const ModalClose = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: white;
`;

export const ModalPoster = styled.img`
  width: 100%;
  height: auto;
`;

const ModalContent = styled.div`
  padding: 40px;
  color: white;
`;

const ModalDetails = styled.p`
  color: #46d369;
  font-weight: 600;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ModalTitle = styled.h2`
  padding: 0;
  font-size: 40px;
  margin: 16px 0;
`;

const ModalOverView = styled.p`
  font-size: 20px;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export default MovieModal;
