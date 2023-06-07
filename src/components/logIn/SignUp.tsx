import './FormStyles.scss';

// import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';

import api from '../../api';
import eye from '../../icons/eye-off.svg';
import { registerSchema } from '../../yupValidation';

type SignUpValues = {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(true);

  const submitSignUp = async (
    values: SignUpValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    const { userName, password, fullName } = values;

    try {
      const response = await api.post('/auth/register', {
        username: userName,
        password: password,
        displayName: fullName,
      });
      const tokens = await api.post('/auth/login', {
        username: userName,
        password: password,
      });
      const { accessToken, refreshToken } = tokens.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.log('???????errror????');
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{ fullName: '', userName: '', password: '', confirmPassword: '' }}
      validationSchema={registerSchema}
      onSubmit={submitSignUp}
    >
      <Form className="form">
        <div className="form__input">
          <label htmlFor="fullName">Full Name</label>
          <Field
            className="form__input__field"
            placeholder="Example Name"
            type="text"
            id="fullName"
            name="fullName"
          />
          <ErrorMessage name="fullName" component="div" className="form__input__error" />
        </div>
        <div className="form__input">
          <label htmlFor="userName">User Name:</label>
          <Field
            className="form__input__field"
            placeholder="Example123"
            type="text"
            id="userName"
            name="userName"
          />
          <ErrorMessage name="userName" component="div" className="form__input__error" />
        </div>
        <div className="form__input">
          <label htmlFor="password">Password</label>
          <Field
            className="form__input__field"
            placeholder="***************"
            type={isVisiblePassword ? 'password' : 'text'}
            id="password"
            name="password"
          />
          <button
            type="button"
            className="form__input__eye"
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
          >
            <img src={eye} alt="eye-off" />
          </button>
          <ErrorMessage name="password" component="div" className="form__input__error" />
        </div>
        <div className="form__input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field
            className="form__input__field"
            placeholder="***************"
            type={isVisibleConfirmPassword ? 'password' : 'text'}
            id="confirmPassword"
            name="confirmPassword"
          />
          <button
            type="button"
            className="form__input__eye"
            onClick={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}
          >
            <img src={eye} alt="eye-off" />
          </button>
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="form__input__error"
          />
        </div>
        <button className="form__btn" type="submit">
          Sign Up
        </button>
      </Form>
    </Formik>
  );
}

export default SignUp;
