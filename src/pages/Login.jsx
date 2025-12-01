import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      // .matches(
      //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //   "Invalid email format"
      // )
      .required("Email is a required field"),
    // .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleLogin = async (values) => {
    let data = {
      username: values.email,
      password: values.password,
    };
    try {
      const loginData = await axios.post(
        "https://api.freeapi.app/api/v1/users/login",
        data,
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      if (loginData.data) {
        debugger;
        if (loginData.data?.statusCode == "200") {
          localStorage.setItem(
            "accessToke",
            loginData?.data?.data?.accessToken
          );
          localStorage.setItem(
            "userName",
            loginData?.data?.data?.user?.username
          );
          toast.success(loginData?.data.message);
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.status == "404") {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <>
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
                  <span>Login</span>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email id / username"
                    className="form-control inp_text"
                    id="email"
                  />
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                  {/* <span>Password</span> */}
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </>
    </>
  );
}
export default Login;
