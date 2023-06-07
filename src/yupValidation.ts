import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  fullName: Yup.string().required('Enter fullname'),
  userName: Yup.string().required('Enter username'),
  password: Yup.string().min(8, 'needed 8 or more characters').required('Enter password'),
  confirmPassword: Yup.string()
    .test('passwords-match', 'Passwords do not match', function (value) {
      return value === this.parent.password || value === '';
    })
    .required('Repeat password'),
});

export const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Enter username'),
  password: Yup.string().min(8, 'needed 8 or more characters').required('Enter password'),
});
