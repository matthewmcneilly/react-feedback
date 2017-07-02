import {
  emailChanged,
  passwordChanged,
  loginUserFail,
  loginUserSuccess
} from './index';

it('should create a emailChanged action', () => {
  const action = emailChanged('some payload');

  expect(action).toEqual(
    {
      type: 'email_changed',
      payload: 'some payload'
    }
  );
});


it('should create a passwordChanged action()', () => {
  const action = passwordChanged('some payload')

  expect(action).toEqual(
    {
      type: 'password_changed',
      payload: 'some payload'
    }
  );
});

it('should create a loginUserFail action()', () => {
  const action = loginUserFail()

  expect(action).toEqual(
    {
      type: 'login_user_fail'
    }
  );
});

it('should create a loginUserSuccess action()', () => {
  const action = loginUserSuccess('some payload')

  expect(action).toEqual(
    {
      type: 'login_user_success',
      payload: 'some payload'
    }
  );
});
