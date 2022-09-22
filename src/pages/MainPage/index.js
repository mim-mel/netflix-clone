import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

const MainPage = () => {
  return (
    <>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="TRENDING NOW" id="TN" fetchUrl={requests.fetchTrending} />
      <Row
        title="ACTION MOVIES"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="COMEDY MOVIES"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </>
  );
};

export default MainPage;
