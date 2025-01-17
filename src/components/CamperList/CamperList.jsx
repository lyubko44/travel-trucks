import { Link, useLocation } from "react-router-dom";
import styles from "./CamperList.module.css";
import { addToFavorites, loadMoreCampers, removeFromFavorites, resetVisibleItems} from "../../redux/campersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectVisibleCampers} from "../../redux/campersSlice.js";
import sprite from "../../assets/sprite.svg";
import Feature from "../Feature/Feature";
import { useEffect } from "react";

const CamperList = ({ campers }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const visibleItems = useSelector(selectVisibleCampers);
    const favorites = useSelector(selectFavorites);
    const visibleCampers = campers.slice(0, visibleItems);

    useEffect(() => {
        dispatch(resetVisibleItems());
    }, [dispatch]);

    const handleFavoriteToggle = (camper) => {
        const isFavorite = favorites.some(
            (favCamper) => favCamper.id === camper.id
        );

        if (isFavorite) {
            dispatch(removeFromFavorites(camper));
        } else {
            dispatch(addToFavorites(camper));
        }
    };

    if (!campers) return <p>Loading campers...</p>;

    const handleLoadMore = () => {
        dispatch(loadMoreCampers());
    };

    return (
        <main>
            <div className={styles.campersContainer}>
                <ul className={styles.cardList}>
                    {Array.isArray(visibleCampers) &&
                        visibleCampers.map((camper) => {
                            const isFavorite = favorites.some(
                                (favCamper) => favCamper.id === camper.id
                            );
                            return (
                                <li key={camper.id} className={styles.cardItem}>
                                    <img
                                        src={camper.gallery[0].original}
                                        alt={camper.name}
                                        width={292}
                                        className={styles.cardPhoto}
                                    />
                                    <div className={styles.cardDetailsContainer}>
                                        <div>
                                            <div className={styles.cardDetailsTitle}>
                                                <h2 className={styles.cardName}>{camper.name}</h2>
                                                <div className={styles.cardPriceAndFavourite}>
                                                    <p className={styles.cardPrice}>
                                                        &euro;{Number(camper.price).toFixed(2)}
                                                    </p>
                                                    <button
                                                        className={`${styles["favorite-btn"]} ${
                                                            isFavorite ? styles["favorite-active"] : ""
                                                        }`}
                                                        onClick={() => handleFavoriteToggle(camper)}
                                                    >
                                                        <svg width={25} height={24}>
                                                            <use href={`${sprite}#icon-heartDefault`} />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={styles.ratingContainer}>
                                                <div className={styles.ratingAndStarContainer}>
                                                    <svg className={styles.star} width={16} height={16}>
                                                        <use href={`${sprite}#icon-starDefault`} />
                                                    </svg>
                                                    <p className={styles.cardRating}>{camper.rating}</p>

                                                    <p>({camper.reviews.length} Reviews)</p>
                                                </div>
                                                <div className={styles.locationContainer}>
                                                    <svg className={styles.iconMap} width="16" height="16">
                                                        <use href={`${sprite}#icon-Map`} />
                                                    </svg>
                                                    <p className={styles.cardLocation}>{camper.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={styles.description}>{camper.description}</p>
                                        <Feature camperDetails={camper} />
                                        <Link
                                            to={`/catalog/${camper.id}`}
                                            state={{ from: location }}
                                        >
                                            <button className={styles.showMoreBtn}>Show more</button>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                {visibleItems < campers.length && (
                    <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </main>
    );
};

export default CamperList;