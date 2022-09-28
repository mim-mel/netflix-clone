import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios"
import { ModalPoster } from "../../components/MovieModal";

const DetailPage = () => {
  const {movieId} = useParams()
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(
        `/movie/${movieId}`
      )
      setMovie(request.data);
    }
    fetchData()
  },[movieId])

  if(!movie){
    return <div>'해당하는 무비가 없습니다.'</div>
  }

  return(
    <>
      <section>
        <ModalPoster
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt='movie poster'
        />
      </section>
    </>
  );
};

export default DetailPage;
