import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/favorites.css";
import "../styles/home.css";

const Favorites = () => {
  const { liked, setLiked } = useContext(UserContext);
  const localList = localStorage.getItem("list");
  let likedItems;

  if (localList) {
    likedItems = JSON.parse(localList);
  } else {
    likedItems = [];
  }

  useEffect(() => {
    if (localList === null) {
      setLiked([]);
    }
    const parsedList = JSON.parse(localList);
    setLiked(parsedList);
  }, []);

  const toggleHeart = (e) => {
    e.target.classList.toggle("is-active");
  };
  const removeItem = (data) => {
    let isLiked = false;
    let likedIndex;
    for (let i = 0; i < likedItems.length; i++) {
      const isItLiked = data.id.toString().includes(likedItems[i].id);
      if (isItLiked) {
        isLiked = true;
        likedIndex = i;
      }
    }
    let newLikedList = likedItems.splice(likedIndex, 1);
    setLiked(likedItems);
    localStorage.setItem("list", JSON.stringify(likedItems));
  };

  const heartClicked = (e, item) => {
    // toggleHeart(e);
    removeItem(item);
  };

  return (
    <div>
      <div className="results">
        {liked &&
          liked.map((data, index) => {
            const likedItems = JSON.parse(localList);
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
    </div>
  );
};

export default Favorites;
