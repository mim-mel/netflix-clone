import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const SearchPage = () => {
  const [searchResults, serSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchResults) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      serSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  return <div></div>;
};

export default SearchPage;
