import css from "./Feature.module.css";
import sprite from "../../assets/sprite.svg";

const Feature = ({camperDetails}) => {
    if (!camperDetails) return null;
    const features = [
        {
            key: "transmission",
            label: "Automatic",
            svg: "icon-diagram",
            value: "automatic",
        },
        {key: "kitchen", label: "Kitchen", svg: "icon-cup-hot"},
        {key: "AC", label: "AC", svg: "icon-wind"},
        {key: "bathroom", label: "Bathroom", svg: "mdi--truck-shower"},
        {key: "TV", label: "TV", svg: "icon-tv"},
        {key: "radio", label: "Radio", svg: "icon-ui-radios"},
        {key: "gas", label: "Gas", svg: "iconoir--gas"},
        {key: "microwave", label: "Microwave", svg: "streamline--microwave"},
        {key: "refrigerator", label: "Frige", svg: "mdi--truck-refrigerator"},
        {
            key: "engine",
            label: "Hybrid",
            svg: "icon-fuel-pump",
            value: "hybrid",
        },
        {
            key: "engine",
            label: "Diesel",
            svg: "icon-fuel-pump",
            value: "diesel",
        },
        {key: "engine", label: "Petrol", svg: "icon-fuel-pump", value: "petrol"},
    ];

    return (
        <div className={css.camperContainer}>
            <div className={css.features}>
                {features.map((feature) => {
                    const isFeatureAvailable =
                        camperDetails[feature.key] === true ||
                        camperDetails[feature.key] === feature.value;
                    return isFeatureAvailable ? (
                        <div className={css.feature} key={feature.key}>
                            <svg className={css.icon} width="20" height="20">
                                <use href={`${sprite}#${feature.svg}`}/>
                            </svg>
                            <span>{feature.label}</span>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default Feature;