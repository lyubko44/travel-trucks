import { useEffect, lazy, Suspense } from "react";
import css from "./CatalogPage.module.css";
import Loader from "../../components/Loader/Loader";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredCampers, selectLoading, fetchCampers, toggleFavorite } from "../../redux/campersSlice";

const CamperList = lazy(() => import("../../components/CamperList/CamperList"));

const CatalogPage = () => {
    const dispatch = useDispatch();
    const filteredCampers = useSelector(selectFilteredCampers);
    const isLoading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchCampers());
    }, [dispatch]);

    const handleFavoriteToggle = (id) => {
        dispatch(toggleFavorite(id));
    };

    const handleLoadMore = () => {
        // Implement the logic to load more campers
    };

    const handleViewDetails = (id) => {
        // Implement the logic to view camper details
    };

    return (
        <Suspense fallback={<Loader />}>
            <div className={css.catalogContainer}>
                <Filter />
                {isLoading ? <Loader /> : <CamperList campers={filteredCampers} onFavoriteToggle={handleFavoriteToggle} onLoadMore={handleLoadMore} onViewDetails={handleViewDetails} />}
            </div>
        </Suspense>
    );
};

export default CatalogPage;