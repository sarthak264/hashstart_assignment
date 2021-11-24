import {
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="main_header">
        <HeaderItem delay="100" title="HOME" Icon={HomeIcon} data-aos="fade"/>
        <HeaderItem delay="150" title="TRENDING" Icon={LightningBoltIcon} />
        <HeaderItem delay="200" title="FAVORITES" Icon={HeartIcon} />
        <HeaderItem delay="250" title="SEARCH" Icon={SearchIcon} />
        <HeaderItem delay="300" title="ACCOUNT" Icon={UserIcon} />
      </div>
      <img
        src="./images/logo.png"
        alt="logo"
        className="logo"
        data-aos="fade-left"
        data-aos-delay="400"
      />
    </header>
  );
};

export default Header;
