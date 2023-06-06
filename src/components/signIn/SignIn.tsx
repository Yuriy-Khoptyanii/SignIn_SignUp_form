import '../../pages/auth/FormStyles.scss';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import eye from '../../icons/eye-off.svg';

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Enter username'),
  password: Yup.string().required('Enter password'),
});

function SignIn() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const handleSubmit = () => {
    console.log('Відправлено: робити правильну логіку');
  };

  return (
    <Formik
      initialValues={{ userName: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
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
