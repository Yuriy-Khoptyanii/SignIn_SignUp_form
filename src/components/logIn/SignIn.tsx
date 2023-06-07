import './FormStyles.scss';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';

import api from '../../api';
import eye from '../../icons/eye-off.svg';
import { LoginSchema } from '../../yupValidation';

type SignInValues = {
  userName: string;
  password: string;
};

function SignIn() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const submitSignIn = async (
    values: SignInValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    const { userName, password } = values;

    try {
      const tokens = await api.post('/auth/login', {
        username: userName,
        password: password,
      });
      const { accessToken, refreshToken } = tokens.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log(tokens.data);
    } catch (error) {
      console.log('???????errror????');
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{ userName: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={submitSignIn}
    >
      <Form className="form">
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
          <label htmlFor="password">Password:</label>
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
        <button className="form__btn" type="submit">
          Sign In
        </button>
      </Form>
    </Formik>
  );
}

export default SignIn;
