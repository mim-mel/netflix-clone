import { useEffect, useState } from 'react';
import axios from '../api/axios';
import styled from 'styled-components';
import MovieModal from './MovieModal';
import './Row.css';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <RowPosters id={id}>
          {/* 값을 못찾는 것을 방지하기 위해 방어코드 작성 */}
          {isLargeRow ? (
            <>
              {movies?.map((movie) => (
                <SwiperSlide>
                  <RowPosterLarge
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                  />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {movies?.map((movie) => (
                <SwiperSlide>
                  <RowPosterNormal
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                  />
                </SwiperSlide>
              ))}
            </>
          )}
        </RowPosters>
      </Swiper>
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
