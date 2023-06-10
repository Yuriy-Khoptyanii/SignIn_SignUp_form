import './FormStyles.scss';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import eye from '../../icons/eye-off.svg';
import { useAppDispatch } from '../../store';
import { fetchSignIn } from '../../store/auth/thunks';
import { SignInValues } from '../../types/allTypes';
import { LoginSchema } from '../../yupValidation';

function SignIn() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitSignIn = async (
    values: SignInValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    await dispatch(fetchSignIn({ values }));
    navigate('/home');
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
