import React from "react";
import { useFormik } from "formik";
import Axios from 'axios'
import '../css/Form.css'
const validate = (values) => {
  const errors = {};
  var minNumberofChars = 6;
  var maxNumberofChars = 16;
  var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  } else if (
    /[!@#$%^&*(),.?":{}|<>]/g.test(values.firstName) ||
    !/^[A-Z]/.test(values.firstName) ||
    /\d+/g.test(values.firstName)
  ) {
    errors.firstName = "Invalid first name";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  } else if (
    /[!@#$%^&*(),.?":{}|<>]/g.test(values.lastName) ||
    !/^[A-Z]/.test(values.lastName) ||
    /\d+/g.test(values.lastName)
  ) {
    errors.lastName = "Invalid surname";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (
    values.password.length < minNumberofChars ||
    values.password.length > maxNumberofChars
  ) {
    errors.password = "Password must 5 to 15 letters long";
  } else if (!regularExpression.test(values.password)) {
    errors.password =
      "password should contain atleast one number and one special character";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm password must be same as password!";
  }

  return errors;
};

const CreateUser = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      Axios.post("http://127.0.0.1:8000/api/user/", {
        username: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      })
        .then((response) => {
          const res = response.data;
          console.log(res);
          alert("Your user been created");
        })
        .catch((error) => {
          const res = error.message;
          alert(res);
        });
    },
  });

  return (
    <div className="row form">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <div className="card text-center">
          <div className="card-header">
            <b>Create New User</b>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group row">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="form-error" >{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="form-error" >{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="form-error" >{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="form-error" >{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="form-error" >{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={formik.handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
            {/* <a href="#" className="btn btn-primary">
                  Go somewhere
                </a> */}
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      </div>
      <div className="col-sm-3"></div>
    </div>
  );
};

export default CreateUser;
