import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/home.css";
import Thumbnail from "./Thumbnail";

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
              <Thumbnail data={data} index={index} page="favorites" isLiked={isLiked} key={index}/>
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;
