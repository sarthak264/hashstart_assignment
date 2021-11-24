import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Thumbnail from "./Thumbnail";
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
          let isLiked = false;
          for (let i = 0; i < likedItems.length; i++) {
            const isItLiked = data.id.toString().includes(likedItems[i].id);
            if (isItLiked) {
              isLiked = true;
            }
          }
          return (
            <Thumbnail
              data={data}
              index={index}
              page="home"
              isLiked={isLiked}
              key={index}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
