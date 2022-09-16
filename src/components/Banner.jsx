import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져 오기(여러개의 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    // 여러 영화 중 영화 하나의 아이디를 가지고 옴
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    //특정영화의 더 상세한 정보를 가지고 오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "video" },
    });
    setMovie(movieDetail);
  };

  return (
    <>
      <HeaderBlock
        imageUrl={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      >
        <BannerContentsWrap>
          <BannerTitle>
            {movie.title || movie.name || movie.original}
          </BannerTitle>
          <BannerButtonsWrap>
            <PlayButton>Play</PlayButton>
            <InfoButton>Info</InfoButton>
          </BannerButtonsWrap>
          <BannerDescription>{movie.overview}</BannerDescription>
        </BannerContentsWrap>
      </HeaderBlock>
    </>
  );
};

const HeaderBlock = styled.header`
  background-image: linear-gradient(
      to bottom,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    ),
    url(${(props) => props.imageUrl});
  position: relative;
  background-position: top center;
  background-size: cover;
  color: white;
  object-fit: contain;
  height: 65vh;

  @media screen and (max-width: 1500px) {
    height: 40vh;
  }

  @media screen and (max-width: 900px) {
    height: 55vh;
  }
`;

const BannerContentsWrap = styled.div`
  margin-left: 40px;
  padding-top: 150px;
  height: 190px;

  @media screen and (max-width: 1500px) {
    padding-top: 100px;
  }

  @media screen and (max-width: 900px) {
    padding-top: 100px;
    padding-left: 2.3rem;
    margin-left: 0px !important;
  }
`;

const BannerTitle = styled.h1`
  font-size: 2vw;
  font-weight: 800;
  padding-bottom: 0.5rem;
  text-align: left;

  @media screen and (max-width: 1500px) {
    font-size: 5vw;
  }

  @media screen and (max-width: 900px) {
    text-align: left;
    font-size: 7vw;
  }
`;

const BannerDescription = styled.div`
  width: 25vw;
  display: flex;
  line-height: 1.5;
  padding-top: 20px;
  font-weight: 500;
  font-size: 0.9vw;
  height: 80px;
  text-align: left;

  @media screen and (max-width: 1500px) {
    font-size: 2.5vw;
    max-width: 40vw;
    line-height: 2;
  }

  @media screen and (max-width: 900px) {
    font-size: 3vw;
    display: flex;
    width: 100vw;
    max-width: 70vw;
    margin: 0;
    line-height: 1.5;
  }
`;

const BannerButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.4rem 1.8rem 0.4rem 1rem;
  margin-right: 1rem;
  background-color: white;
  color: black;

  :hover {
    color: #000;
    background-color: rgba(191, 191, 191, 0.9);
    transition: all 0.2s;
  }
`;

const InfoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.4rem 1.8rem 0.4rem 1rem;
  margin-right: 1rem;
  background-color: rgba(60, 60, 60, 0.7);
  color: white;

  :hover {
    background-color: rgb(51, 51, 51);
    color: white;
    transition: all 0.2s;
  }

  @media screen and (max-width: 900px) {
    text-align: start;
    padding-right: 1.2rem;
  }
`;

export default Banner;
