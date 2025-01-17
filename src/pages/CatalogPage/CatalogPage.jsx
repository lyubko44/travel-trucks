import { useEffect, lazy, Suspense } from "react";
import css from "./CatalogPage.module.css";
import Loader from "../../components/Loader/Loader";
import Filter from "../../components/Filter/Filter";
import { selectLoading } from "../../redux/campersSlice.js";
import { fetchCampers } from "../../redux/campersOperations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredCampers } from "../../redux/filterSlice.js";

const CamperList = lazy(() => import("../../components/CamperList/CamperList"));

const CatalogPage = () => {
    const dispatch = useDispatch();
    const filteredCampers = useSelector(selectFilteredCampers);
    const isLoading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchCampers());
    }, [dispatch]);

    return (
        <Suspense fallback={<Loader />}>
            <div className={css.catalogContainer}>
                <Filter />
                {isLoading ? <Loader /> : <CamperList campers={filteredCampers} />}
            </div>
        </Suspense>
    );
};

export default CatalogPage;