import PropTypes from "prop-types";
import styles from "./CamperList.module.css";

const CamperList = ({ campers, onFavoriteToggle, onLoadMore, onViewDetails }) => {
    return (
        <div className={styles.campersContainer}>
            <div className={styles.cardList}>
                {campers.map((camper) => (
                    <div key={camper.id} className={styles.cardItem}>
                        <img
                            src={camper.image}
                            alt={camper.name}
                            className={styles.cardPhoto}
                        />
                        <div className={styles.cardDetailsContainer}>
                            <div className={styles.cardDetailsTitle}>
                                <h3 className={styles.cardName}>{camper.name}</h3>
                                <div className={styles.cardPriceAndFavourite}>
                  <span className={styles.cardPrice}>
                    {camper.price.toLocaleString("en-US")},00
                  </span>
                                    <button
                                        className={`${styles.favoriteBtn} ${
                                            camper.isFavorite ? styles["favorite-active"] : ""
                                        }`}
                                        onClick={() => onFavoriteToggle(camper.id)}
                                    >
                                        {camper.isFavorite ? "★" : "☆"}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.ratingContainer}>
                                <div className={styles.ratingAndStarContainer}>
                                    <span className={styles.star}>★</span>
                                    <span>{camper.rating.toFixed(1)}</span>
                                </div>
                                <span>{camper.reviews} reviews</span>
                            </div>

                            <div className={styles.cardDetails}>
                                {camper.details.map((detail) => (
                                    <div key={detail} className={styles.cardDetailsItem}>
                                        {detail}
                                    </div>
                                ))}
                            </div>

                            <button
                                className={styles.showMoreBtn}
                                onClick={() => onViewDetails(camper.id)}
                            >
                                Show More
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.loadMoreBtn} onClick={onLoadMore}>
                Load More
            </button>
        </div>
    );
};

CamperList.propTypes = {
    campers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            reviews: PropTypes.number.isRequired,
            details: PropTypes.arrayOf(PropTypes.string).isRequired,
            isFavorite: PropTypes.bool,
        })
    ).isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default CamperList;
