import React from 'react';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';

import './styles.css';

const LoginPage = () => {
    return (
        <div className="formWrapper">
            <div className="formBox">
                <h1>Login Page.</h1>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validate={(values) => {
                        const errors: any = {};
                        if (!values.username) {
                            errors.username = 'Required';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        if (values.password.length < 6) {
                            errors.password =
                                'Password must be more the 6 charaters';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                className="form-control"
                            />
                            <p>
                                {errors.username &&
                                    touched.username &&
                                    errors.username}
                            </p>
                            <br />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="form-control"
                            />
                            <p>
                                {errors.password &&
                                    touched.password &&
                                    errors.password}
                            </p>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary my-1 w-100"
                            >
                                Sing In!
                            </button>
                            <Link
                                to="/register"
                                className="btn btn-primary my-1 w-100"
                            >
                                Sing Up?
                            </Link>
                            <Link to="/" className="btn btn-primary my-1 w-100">
                                Home
                            </Link>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
