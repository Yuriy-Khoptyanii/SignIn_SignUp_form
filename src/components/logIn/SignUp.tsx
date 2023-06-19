import './FormStyles.scss';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import eye from '../../icons/eye-off.svg';
import { RootState, useAppDispatch } from '../../store';
import { fetchSignUp } from '../../store/auth/thunks';
import { SignUpValues } from '../../types/allTypes';
import { registerSchema } from '../../yupValidation';

function SignUp() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.username.length) {
      navigate('/home');
    }
  }, [user]);

  const submitSignUp = async (values: SignUpValues) => {
    await dispatch(fetchSignUp({ values }));
  };

  return (
    <>
      <div className="errorSignUp">{error}</div>
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
            <ErrorMessage
              name="fullName"
              component="div"
              className="form__input__error"
            />
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
            <ErrorMessage
              name="userName"
              component="div"
              className="form__input__error"
            />
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
            <ErrorMessage
              name="password"
              component="div"
              className="form__input__error"
            />
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
    </>
  );
}

export default SignUp;
