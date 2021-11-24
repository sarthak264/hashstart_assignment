import { useEffect, useState } from "react";
import "../styles/home.css";

const Home = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const toggleHeart = (e) => {
    e.target.classList.toggle("is-active");
  };

  // const getMoreMovies = () => {
  //   const fetchData = async () => {
  //     const request = await fetch(
  //       `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
  //     )
  //       .then((res) => res.json())
  //       .then((array) => array.results);

  //     const newData = [...data, request];
  //     setData(newData);
  //     setPage(page + 1);
  //   };
  //   fetchData();
  // };

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      )
        .then((res) => res.json())
        .then((array) => array.results);

      setData(request);
      setPage(2);
    };
    fetchData();
  }, [API_KEY]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="home-page">
      {/* <h1 className="heading">Trending Movies</h1> */}
      <div className="results">
        {data.map((data, index) => {
          const base_url = "https://image.tmdb.org/t/p/original/";
          return (
            <div
              className="thumbnail"
              key={index}
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <div className="img-container">
                <img
                  src={
                    `${base_url}${data.backdrop_path || data.poster_path}` ||
                    `${base_url}${data.poster_path}`
                  }
                  alt={data.title || data.original_name}
                  loading="lazy"
                  className="poster"
                />
                <div className="stage">
                  <div className="heart" onClick={(e) => toggleHeart(e)}></div>
                </div>
              </div>
              <div className="details">
                <h3 className="title">{data.title || data.original_name}</h3>
                <div className="hidden">
                  <p className="date">
                    {data.media_type && `${data.media_type} `}&middot;{" "}
                    {data.release_date || data.first_air_date}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <button onClick={getMoreMovies}>Show More</button> */}
    </main>
  );
};

export default Home;
