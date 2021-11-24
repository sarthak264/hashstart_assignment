import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/home.css";

const Home = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState([]);
  const { liked, setLiked } = useContext(UserContext);
  const localList = localStorage.getItem("list");
  let likedItems;

  if (localList) {
    likedItems = JSON.parse(localList);
  } else {
    likedItems = [];
  }

  const toggleHeart = (e) => {
    e.target.classList.toggle("is-active");
  };
  const setFav = (data) => {
    let isLiked = false;
    let likedIndex;
    for (let i = 0; i < likedItems.length; i++) {
      const isItLiked = data.id.toString().includes(likedItems[i].id);
      if (isItLiked) {
        isLiked = true;
        likedIndex = i;
      }
    }
    if (!isLiked) {
      let newList;
      if (localStorage.getItem("list") === null) {
        newList = [data];
      } else {
        newList = [...liked, data];
      }
      setLiked(newList);
      localStorage.setItem("list", JSON.stringify(newList));
    } else {
      let newLikedList = likedItems.splice(likedIndex, 1);
      localStorage.setItem("list", JSON.stringify(likedItems));
      setLiked(likedItems);
    }
  };
  const heartClicked = (e, item) => {
    toggleHeart(e);
    setFav(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((array) => array.results);

      setData(request);
    };
    fetchData();
  }, [API_KEY]);

  useEffect(() => {
    if (localList === null) {
      setLiked([]);
    }
    const parsedList = JSON.parse(localList);
    setLiked(parsedList);
  }, []);

  return (
    <main className="home-page">
      <div className="results">
        {data.map((data, index) => {
          const base_url = "https://image.tmdb.org/t/p/original/";
          let isLiked = false;
          for (let i = 0; i < likedItems.length; i++) {
            const isItLiked = data.id.toString().includes(likedItems[i].id);
            if (isItLiked) {
              isLiked = true;
            }
          }
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
                  <div
                    className={`${isLiked ? "heart is-active" : "heart"}`}
                    onClick={(e) => {
                      heartClicked(e, data);
                    }}
                  ></div>
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
    </main>
  );
};

export default Home;
