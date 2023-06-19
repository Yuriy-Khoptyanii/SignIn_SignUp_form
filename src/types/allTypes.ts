export interface SignInValues {
  userName: string;
  password: string;
}

export interface SignUpValues {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface UserSelf {
  admin: boolean;
  displayName: string;
  id: number;
  username: string;
}

export interface InitialState {
  user: UserSelf;
  isUserLoaded: boolean;
}

export type Payload<T> = { values: T };

export interface RegisterError {
  message: string;
}
