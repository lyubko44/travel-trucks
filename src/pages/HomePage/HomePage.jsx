import { Link, useLocation } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const location = useLocation();

  return (
    <div className={css.homeContainer}>
      <h1 className={css.homeHeading}>Campers of your dreams</h1>
      <p className={css.homeSlogan}>
        You can find everything you want in our catalog
      </p>
      <Link to={`/catalog`} state={{ from: location }}>
        <button className={css.homeBtn}>View now</button>
      </Link>
    </div>
  );
};

export default HomePage;
