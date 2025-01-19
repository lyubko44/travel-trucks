import styles from "./BookingForm.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

registerLocale("en-GB", enGB);

const Schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    comment: Yup.string(),
    date: Yup.date().required("Date is required"),
});

const BookingForm = () => {
    return (
        <div className={styles.form_wrapper}>
            <h3 className={styles.client_title}>Book your campervan now</h3>
            <p className={styles.client_text}>
                Stay connected! We are always ready to help you.
            </p>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    date: "",
                    comment: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, { resetForm }) => {
                    toast.success("You successfully sent the form!");
                    resetForm();
                }}
            >
                {({ errors, values, touched, setFieldValue }) => (
                    <Form>
                        <div className={styles.input_wrapper}>
                            <label htmlFor="name"></label>
                            <Field
                                className={styles.input_text}
                                name="name"
                                type="text"
                                placeholder="Name*"
                            />
                            {touched.name && errors.name ? (
                                <div className={styles.errorMessage}>{errors.name}</div>
                            ) : null}
                            <label htmlFor="email"></label>
                            <Field
                                className={styles.input_text}
                                name="email"
                                type="email"
                                placeholder="Email*"
                            />
                            {touched.email && errors.email ? (
                                <div className={styles.errorMessage}>{errors.email}</div>
                            ) : null}
                            <label htmlFor="date"></label>
                            <DatePicker
                                selected={values.date}
                                onChange={(date) => setFieldValue("date", date)}
                                className={styles.input_text}
                                placeholderText="Booking date*"
                                locale="en-GB"
                            />
                            {touched.date && errors.date ? (
                                <div className={styles.errorMessage}>{errors.date}</div>
                            ) : null}
                            <label htmlFor="comment"></label>
                            <Field
                                className={styles.input_comment}
                                name="comment"
                                as="textarea"
                                placeholder="Comment"
                            />
                        </div>
                        <button className={styles.send_button} type="submit">
                            Send
                        </button>
                        <ToastContainer />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;