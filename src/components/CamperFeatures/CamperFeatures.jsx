import { useOutletContext } from "react-router-dom";
import css from "./CamperFeatures.module.css";
import Feature from "../Feature/Feature";

const CamperFeatures = () => {
    const { camperDetails } = useOutletContext();

    if (!camperDetails) return null;

    return (
        <div className={css.camperContainer}>
            <div>
                <Feature camperDetails={camperDetails} />
            </div>
            <h3 className={css.equipmentTitle}>Vehicle details</h3>
            <div className={css.equipmentContainer}>
                <div className={css.equipmentDetails}>
                    <p>Form </p>
                    <p>{camperDetails.form}</p>
                </div>
                <div className={css.equipmentDetails}>
                    <p>Length</p>
                    <p>{camperDetails.length}</p>
                </div>
                <div className={css.equipmentDetails}>
                    <p>Width</p>
                    <p>{camperDetails.width}</p>
                </div>
                <div className={css.equipmentDetails}>
                    <p>Height</p>
                    <p>{camperDetails.height}</p>
                </div>
                <div className={css.equipmentDetails}>
                    <p>Tank</p>
                    <p>{camperDetails.tank}</p>
                </div>
                <div className={css.equipmentDetails}>
                    <p>Consumption</p>
                    <p> {camperDetails.consumption}</p>
                </div>
            </div>
        </div>
    );
};

export default CamperFeatures;