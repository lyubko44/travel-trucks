import { useState } from "react";
import css from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { clearFilters, updateFilters } from "../../redux/filterSlice.js";
import { resetVisibleItems } from "../../redux/campersSlice.js";
import sprite from "../../assets/sprite.svg";

const Filter = () => {
    const dispatch = useDispatch();
    const [localFilters, setLocalFilters] = useState({
        location: "",
        AC: false,
        transmission: "",
        Kitchen: false,
        TV: false,
        Bathroom: false,
        // microwave: false,
        // gas: false,
        // radio: false,
        refrigerator: false,
        form: "",
    });

    const handleFilterChange = (filter) => {
        setLocalFilters((prev) => {
            const updatedFilters = {
                ...prev,
                [filter]: !prev[filter],
            };
            return updatedFilters;
        });
    };

    const handleLocationChange = (e) => {
        setLocalFilters((prev) => ({
            ...prev,
            location: e.target.value,
        }));
    };

    const handleTransmissionChange = (transmission) => {
        setLocalFilters((prev) => ({
            ...prev,
            transmission: prev.transmission === transmission ? "" : transmission,
        }));
    };

    const handleFormChange = (form) => {
        setLocalFilters((prev) => ({
            ...prev,
            form: prev.form === form ? "" : form,
        }));
    };

    const handleSearchClick = () => {
        setLocalFilters({});
        dispatch(clearFilters());
        dispatch(updateFilters(localFilters));
        dispatch(resetVisibleItems());
    };

    return (
        <aside className={css.filters}>
            <div className={css.location}>
                <label htmlFor="location" className={css.locationLabel}>
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    className={css.locationContent}
                    value={localFilters.location || ""}
                    placeholder="City"
                    onChange={handleLocationChange}
                />
                <svg className={css.iconMap} width={20} height={20}>
                    <use href={`${sprite}#icon-Map`} />
                </svg>
            </div>
            <div>
                <h2 className={css.filterTitle}>Filters</h2>
                <div>
                    <h3 className={css.filterGroupTitle}>Vehicle equipment</h3>
                    <ul className={css.filterGroupList}>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.AC ? css.active : ""
                                }`}
                                onClick={() => handleFilterChange("AC")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-wind`} />
                                </svg>
                                AC
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.transmission === "automatic" ? css.active : ""
                                }`}
                                onClick={() => handleTransmissionChange("automatic")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-diagram`} />
                                </svg>
                                Automatic
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.Kitchen ? css.active : ""
                                }`}
                                onClick={() => handleFilterChange("Kitchen")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-cup-hot`} />
                                </svg>
                                Kitchen
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.TV ? css.active : ""
                                }`}
                                onClick={() => handleFilterChange("TV")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-tv`} />
                                </svg>
                                TV
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.Bathroom ? css.active : ""
                                }`}
                                onClick={() => handleFilterChange("Bathroom")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#mdi--truck-shower`} />
                                </svg>
                                Bathroom
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={css.filterFormTitle}>Vehicle type</h3>
                    <ul className={css.filterGroupList}>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.form === "van" ? css.active : ""
                                }`}
                                onClick={() => handleFormChange("van")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-bi_grid-1x2`} />
                                </svg>
                                Van
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.form === "fullyIntegrated" ? css.active : ""
                                }`}
                                onClick={() => handleFormChange("fullyIntegrated")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-bi_grid`} />
                                </svg>
                                Fully Integrated
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${css.filterBtn} ${
                                    localFilters.form === "alcove" ? css.active : ""
                                }`}
                                onClick={() => handleFormChange("alcove")}
                            >
                                <svg className={css.svgIconPlus} width={32} height={32}>
                                    <use href={`${sprite}#icon-bi_grid-3x3-gap`} />
                                </svg>
                                Alcove
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <button className={css.searchBtn} onClick={handleSearchClick}>
                Search
            </button>
        </aside>
    );
};

export default Filter;