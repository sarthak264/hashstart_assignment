const HeaderItem = ({ delay, title, Icon }) => {
  return (
    <div className="header_item">
      <Icon className="header_item_icon" data-aos="fade-right" data-aos-delay={delay} />
      <p className="header_item_name">{title}</p>
    </div>
  );
};

export default HeaderItem;
