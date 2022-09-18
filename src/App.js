import requests from "./api/requests";
import "./App.css";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Row from "./components/Row";

function App() {
  return (
    <div className="App">
      <Nav />
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
    </div>
  );
}

export default App;
