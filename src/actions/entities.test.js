import { receiveActiveUser } from './entities';

// does receiveActiveUser have type and activeUser props
it('should create a receiveActiveUser action', () => {
  const action = receiveActiveUser({activeUser: 'some user'});

  expect(action).toEqual(
    {
      type: 'entities_receive_active_user',
      activeUser: 'some user'
    }
  );
});
