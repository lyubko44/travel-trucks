import { useOutletContext } from "react-router-dom";
import Rating from "../Rating/Rating.jsx";
import styles from "./CamperReviews.module.css";

const CamperReviews = () => {
    const { camperDetails } = useOutletContext();

    if (!camperDetails) {
        return <p>Loading...</p>;
    }

    return (
        <ul className={styles.reviewsList}>
            {camperDetails.reviews?.length > 0 ? (
                camperDetails.reviews.map((review, index) => {
                    return (
                        <li key={index} className={styles.authorItem}>
                            <div className={styles.authorContainer}>
                                <div className={styles.authorInitial}>
                                    {review.reviewer_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className={styles.reviewsAuthor}>{review.reviewer_name}</h3>
                                    <Rating rating={review.reviewer_rating} />
                                </div>
                            </div>
                            <p className={styles.authorComment}>{review.comment}</p>
                        </li>
                    );
                })
            ) : (
                <p>We don&apos;t have any reviews for this camper</p>
            )}
        </ul>
    );
};

export default CamperReviews;