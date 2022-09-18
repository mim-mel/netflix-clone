import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  if (!isClicked) {
    return (
      <>
        <HeaderBlock img={movie.backdrop_path}>
          <BannerContentsWrap>
            <BannerTitle>
              {movie.title || movie.name || movie.original}
            </BannerTitle>
            <BannerButtonsWrap>
              <PlayButton
                onClick={() => {
                  setIsClicked(true);
                }}
              >
                Play
              </PlayButton>
              <InfoButton>Info</InfoButton>
            </BannerButtonsWrap>
            <BannerDescription>{movie.overview}</BannerDescription>
          </BannerContentsWrap>
        </HeaderBlock>
      </>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="560"
            height="315"
            Secure="true"
            Samesite="None"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
            ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            frameborder="0"
            allow="autoplay; fullscreen;"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
};

const HeaderBlock = styled.header`
  background-image: linear-gradient(
      to bottom,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    ),
    url(https://image.tmdb.org/t/p/original/${(props) => props.img});
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
  font-size: 1vw;
  height: 80px;
  text-align: left;

  @media screen and (max-width: 1500px) {
    font-size: 1.3vw;
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

const Button = styled.button`
  width: 90px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.8vw;
`;

const PlayButton = styled(Button)`
  margin-right: 15px;
  background-color: white;
  color: black;

  :hover {
    color: #000;
    background-color: rgba(191, 191, 191, 0.9);
    transition: all 0.2s;
  }
`;

const InfoButton = styled(Button)`
  background-color: rgba(60, 60, 60, 0.7);
  color: white;

  :hover {
    background-color: rgb(51, 51, 51);
    color: white;
    transition: all 0.2s;
  }
`;

//isClicked가 ture 일 때 변경되는 UI

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
`;

export default Banner;
