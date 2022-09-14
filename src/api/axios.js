import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "d6a23af73340e83ad2a7d2ac491aab52",
    language: "ko-KR",
  },
});

export default instance;
