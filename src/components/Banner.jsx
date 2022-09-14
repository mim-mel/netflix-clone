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

  return <></>;
};

export default Banner;
