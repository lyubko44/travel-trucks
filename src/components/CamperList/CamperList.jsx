import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import styles from "./CamperList.module.css";
import { toggleFavorite, removeFromFavorites, resetVisibleItems,} from "../../redux/campersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectVisibleCampers} from "../../redux/campersSelectors.js";
import sprite from "../../assets/sprite.svg";
import Feature from "../Feature/Feature";
import { useEffect } from "react";

const CamperList = ({ campers, onFavoriteToggle, onLoadMore, onViewDetails }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const visibleItems = useSelector(selectVisibleCampers);
    const favorites = useSelector(selectFavorites);
    const visibleCampers = campers.slice(0, visibleItems);

    useEffect(() => {
        dispatch(resetVisibleItems()); // Reset state on initial load
    }, [dispatch]);

    const handleFavoriteToggle = (camper) => {
        const isFavorite = favorites.some(
            (favCamper) => favCamper.id === camper.id
        );

        if (isFavorite) {
            dispatch(removeFromFavorites(camper));
        } else {
            dispatch(toggleFavorite(camper));
        }
        onFavoriteToggle(camper.id);
    };

    if (!campers) return <p>Loading campers...</p>;

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
                                            <button className={styles.showMoreBtn} onClick={() => onViewDetails(camper.id)}>Show more</button>
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                {visibleItems < campers.length && (
                    <button className={styles.loadMoreBtn} onClick={onLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </main>
    );
};

CamperList.propTypes = {
    campers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            gallery: PropTypes.arrayOf(
                PropTypes.shape({
                    original: PropTypes.string.isRequired,
                })
            ).isRequired,
            rating: PropTypes.number.isRequired,
            reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
            location: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default CamperList;