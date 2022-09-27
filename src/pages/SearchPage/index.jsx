import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../api/axios';
import useDebounce from '../../hooks/useDebounce';

const SearchPage = () => {
  const [searchResults, serSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get('q');
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovie = async (searchResults) => {
    console.log('search', searchTerm);
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      serSearchResults(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <SearchContainer>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl =
              'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <Movie key={movie.id}>
                <MovieColumnPoster>
                  <MoviePoster src={movieImageUrl} alt="movie" />
                </MovieColumnPoster>
              </Movie>
            );
          }
        })}
      </SearchContainer>
    ) : (
      <NoResultsContainer>
        <NoResultsText>
          <p>찾고자 하는 검색어 "{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
        </NoResultsText>
      </NoResultsContainer>
    );
  };

  return renderSearchResults();
};

const SearchContainer = styled.section`
  background-color: black;
  width: 100%;
  text-align: center;
  padding: 5rem 0;
`;

const Movie = styled.div`
  flex: 1 1 auto;
  display: inline-block;
  padding-right: 0.5rem;
  padding-bottom: 7rem;
`;

const MovieColumnPoster = styled.div`
  cursor: pointer;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  :hover {
    transform: scale(1.25);
  }
`;

const MoviePoster = styled.img`
  width: 90%;
  border-radius: 5px;
`;

const NoResultsContainer = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #c5c5c5;
  height: 100%;
  padding: 8rem;
`;

const NoResultsText = styled.div``;

export default SearchPage;
