import { useEffect, useState } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import MovieModal from "./MovieModal";

const Row = ({ isLargeRow, title, id, fetchUrl }) => {
  const [movies, setMovies] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleLeft = () => {
    document.getElementById(id).scrollLeft -= window.innerWidth - 80;
  };

  const handleRight = () => {
    document.getElementById(id).scrollLeft += window.innerWidth + 80;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <RowBlock>
      <h2>{title}</h2>
      <Slider>
        <SliderArrowLeft>
          <ArrowLeft onClick={handleLeft}>{"<"}</ArrowLeft>
        </SliderArrowLeft>
        <RowPosters id={id}>
          {/* 값을 못찾는 것을 방지하기 위해 방어코드 작성 */}
          {movies?.map((movie) => (
            <>
              {isLargeRow ? (
                <RowPosterLarge
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              ) : (
                <RowPosterNormal
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              )}
            </>
          ))}
        </RowPosters>
        <SliderArrowRight>
          <ArrowRight onClick={handleRight}>{">"}</ArrowRight>
        </SliderArrowRight>
      </Slider>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </RowBlock>
  );
};

const RowBlock = styled.section`
  margin-left: 20px;
  color: white;
`;

const SliderArrowLeft = styled.div`
  background-clip: content-box;
  padding: 20px 0;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 80px;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  :hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
`;

const SliderArrowRight = styled.div`
  padding: 20px 0;
  background-clip: content-box;
  box-sizing: border-box;
  transition: 400ms all ease-in-out;
  cursor: pointer;
  width: 80px;
  z-index: 1000;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  :hover {
    background: rgba(20, 20, 20, 0.5);
    transition: 400ms all ease-in-out;
  }
`;

const Slider = styled.div`
  position: relative;

  :hover ${SliderArrowLeft} {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }

  :hover ${SliderArrowRight} {
    transition: 400ms all ease-in-out;
    visibility: visible;
  }
`;

const Arrow = styled.span`
  transition: 400ms all ease-in-out;
  :hover {
    transition: 400ms all ease-in-out;
    transform: scale(1.5);
  }
`;

const ArrowLeft = styled(Arrow)`
  position: absolute;
  top: 0;
  left: 20px;
  height: 100%;
  width: 32px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

const ArrowRight = styled(Arrow)`
  position: absolute;
  top: 0;
  right: 0px;
  height: 100%;
  width: 32px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
`;

const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const RowPoster = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: 144px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;

  :hover {
    transform: scale(1.08);
  }

  @media screen and (min-width: 1200px) {
    max-height: 160px;
  }

  @media screen and (max-width: 768px) {
    max-height: 100px;
  }
`;
const RowPosterNormal = styled(RowPoster)``;
const RowPosterLarge = styled(RowPoster)`
  max-height: 320px;

  :hover {
    transform: scale(1.1);
    opacity: 1;
  }

  @media screen and (min-width: 1200px) {
    max-height: 360px;
  }

  @media screen and (max-width: 768px) {
    max-height: 280px;
  }
`;

export default Row;
