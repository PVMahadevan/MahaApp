import React, { useContext, useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Image from "../../components/Image";
import { Formik } from "formik";
import KeycloakContext from "../../keycloakContext";
import { login } from "../../services/authentication";
import { keycloakConfig } from "../../keycloak";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const heightWindow = use100vh();
  const [error, setError] = useState('')
  const { keycloakInstance, authenticated } = useContext(KeycloakContext)
  const navigate = useNavigate();

  const onLoginSubmit = async (values, { setSubmitting }) => {
    // alert(JSON.stringify(values, null, 2));
    const params = new URLSearchParams();
    params.append('username', values.email);
    params.append('password', values.password);
    params.append('grant_type', 'password');
    params.append('client_id', keycloakConfig.clientId);
    const [error, result] = await login(params)
    setSubmitting(false);
    if (!error) {
      keycloakInstance.idToken = result.access_token;
      keycloakInstance.refreshToken = result.refresh_token;
      await keycloakInstance.updateToken(1);
      if (keycloakInstance.authenticated) {
        toast.success('Logged in successfully')
        navigate('/');
      } else {
        toast.error('Login Failed')
        setError('Login Failed');
      }
    } else {
      toast.error('Login Failed')
      setError('Invalid Email or Password');
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.col}>

      </div>
      <div className={styles.col} style={{ minHeight: heightWindow }}>
        <div className={styles.head}>
          <Link className={styles.logo} to="/">
            <Image
              className={styles.pic}
              src="/images/logo.png"
              srcDark="/images/logo-dark.png"
              alt="Core"
            />
          </Link>

        </div>
        <div className={styles.wrapper}>
          <div className={cn("h2", styles.title)}>Sign in</div>
          <div className={styles.head}>
            <div className={styles.subtitle}>Sign up with Open account</div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <img src="/images/content/google.svg" alt="Google" />
                Google
              </button>
              <button className={cn("button-stroke", styles.button)}>
                <Image
                  className={styles.pic}
                  src="/images/content/apple-dark.svg"
                  srcDark="/images/content/apple-light.svg"
                  alt="Apple"
                />
                Apple ID
              </button>
            </div>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={onLoginSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (<form className={styles.body} onSubmit={handleSubmit}>
              <div className={styles.subtitle}>Or continue with email address</div>
              <TextInput
                className={styles.field}
                name="email"
                type="email"
                placeholder="Your email"
                required
                icon="mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p> {errors.email && touched.email && errors.email}</p>
              <TextInput
                className={styles.field}
                name="password"
                type="password"
                placeholder="Password"
                required
                icon="lock"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p>{errors.password && touched.password && errors.password}</p>
              <button disabled={isSubmitting} type="submit" className={cn("button", styles.button)}>Sign in</button>
              <p> {error}</p>
              <div className={styles.note}>
                This site is protected by reCAPTCHA and the Google Privacy Policy.
              </div>
              <div className={styles.info}>
                Don’t have an account?{" "}
                <Link className={styles.link} to="/sign-up">
                  Sign up
                </Link>
              </div>
            </form>)}

          </Formik>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
