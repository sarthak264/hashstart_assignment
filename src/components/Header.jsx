import {
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import "../styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="main_header">
        <Link to="/" className="header_item">
          <HeaderItem
            delay="100"
            title="HOME"
            Icon={HomeIcon}
            data-aos="fade"
          />
        </Link>
        <HeaderItem delay="150" title="TRENDING" Icon={LightningBoltIcon} />
        <Link to="/favorites" className="header_item">
          <HeaderItem delay="200" title="FAVORITES" Icon={HeartIcon} />
        </Link>
        <HeaderItem delay="250" title="SEARCH" Icon={SearchIcon} />
        <HeaderItem delay="300" title="ACCOUNT" Icon={UserIcon} />
      </div>
      <Link to="/">
        <img
          src="./images/logo.png"
          alt="logo"
          className="logo"
          data-aos="fade-left"
          data-aos-delay="400"
        />
      </Link>
    </header>
  );
};

export default Header;
