import { useState } from 'react';
import css from './Filter.module.css';

const Filter = ({ onFilterChange }) => {
    const [location, setLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleFeatureToggle = (feature) => {
        setSelectedFeatures((prevFeatures) =>
            prevFeatures.includes(feature)
                ? prevFeatures.filter((f) => f !== feature)
                : [...prevFeatures, feature]
        );
    };

    const handleSearch = () => {
        onFilterChange({ location, selectedType, selectedFeatures });
    };

    return (
        <div className={css.filters}>
            <div className={css.location}>
                <label className={css.locationLabel} htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    className={css.locationContent}
                    value={location}
                    onChange={handleLocationChange}
                />
                <svg className={css.iconMap} viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
            </div>
            <div className={css.filterGroup}>
                <h3 className={css.filterGroupTitle}>Type</h3>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="">Select Type</option>
                    <option value="van">Van</option>
                    <option value="motorhome">Motorhome</option>
                    <option value="trailer">Trailer</option>
                </select>
            </div>
            <div className={css.filterGroup}>
                <h3 className={css.filterGroupTitle}>Features</h3>
                <div className={css.filterGroupList}>
                    {['AC', 'kitchen', 'bathroom', 'TV', 'radio', 'refrigerator', 'microwave', 'gas', 'water'].map((feature) => (
                        <button
                            key={feature}
                            className={`${css.filterBtn} ${selectedFeatures.includes(feature) ? 'active' : ''}`}
                            onClick={() => handleFeatureToggle(feature)}
                        >
                            {feature}
                        </button>
                    ))}
                </div>
            </div>
            <button className={css.searchBtn} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Filter;