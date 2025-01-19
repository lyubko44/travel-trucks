import { useEffect, useState, Suspense } from "react";
import {useParams, Outlet, useLocation, useNavigate, NavLink,} from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import styles from "./CamperDetailsPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";
import { fetchCamperDetailsById } from "../../redux/campersOperations.js";
import sprite from "../../assets/sprite.svg";
import clsx from "clsx";

const CamperDetailsPage = () => {
    const [loading, setLoading] = useState(false);
    const [setSelectedTab] = useState("features");
    const location = useLocation();
    const { camperId } = useParams();
    const [camperDetails, setCamperDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!camperId) return;
        const fetchCamperDetails = async () => {
            try {
                setLoading(true);
                const { data } = await fetchCamperDetailsById(camperId);
                setCamperDetails(data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (camperId) {
            fetchCamperDetails();
        }
    }, [camperId]);

    useEffect(() => {
        if (
            camperId &&
            !location.pathname.includes("features") &&
            !location.pathname.includes("reviews")
        ) {
            navigate("features", { replace: true });
        }
    }, [camperId, location.pathname, navigate]);

    const activeLink = ({ isActive }) => {
        return clsx(styles.detailsLink, isActive && styles.active);
    };

    return (
        <main>
            <div className={styles.container}>
                {loading && <Loader />}
                {camperDetails !== null && (
                    <div className={styles.camper}>
                        <div className={styles.camperContainer}>
                            <h1 className={styles.camperName}>{camperDetails.name}</h1>
                            <div className={styles.ratingContainer}>
                                <div className={styles.ratingAndReviews}>
                                    <svg className={styles.star} width="16" height="16">
                                        <use href={`${sprite}#icon-starDefault`} />
                                    </svg>
                                    <p>{camperDetails.rating}</p>

                                    <p>({camperDetails.reviews.length} Reviews)</p>
                                </div>
                                <div className={styles.locationContainer}>
                                    <svg className={styles.iconMap} width="16" height="16">
                                        <use href={`${sprite}#icon-Map`} />
                                    </svg>
                                    <p>{camperDetails.location}</p>
                                </div>
                            </div>
                            <p className={styles.camperPrice}>
                                &euro;{Number(camperDetails.price).toFixed(2)}
                            </p>
                        </div>
                        <ul className={styles.camperList}>
                            {Array.isArray(camperDetails.gallery) &&
                                camperDetails.gallery.map((camperPhoto, index) => (
                                    <li key={index}>
                                        <img
                                            src={camperPhoto.original}
                                            alt={camperDetails.name}
                                            className={styles.camperListPhoto}
                                            width={292}
                                        />
                                    </li>
                                ))}
                        </ul>
                        <p className={styles.description}>{camperDetails.description}</p>
                    </div>
                )}
                <div className={styles.camperInformation}>
                    <ul className={styles.detailsList}>
                        <li className={styles.detailsItem}>
                            <NavLink
                                className={activeLink}
                                to="features"
                                onClick={() => setSelectedTab("features")}
                            >
                                Features
                            </NavLink>
                        </li>
                        <li className={styles.detailsItem}>
                            <NavLink
                                className={activeLink}
                                to="reviews"
                                onClick={() => setSelectedTab("reviews")}
                            >
                                Reviews
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.detailsContainer}>
                    <Suspense fallback={<Loader />}>
                        <Outlet context={{ camperDetails }} />
                    </Suspense>
                    <BookingForm />
                </div>
            </div>
        </main>
    );
};

export default CamperDetailsPage;
