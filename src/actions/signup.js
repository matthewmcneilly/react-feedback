import firebase from 'firebase';

export const actionTypes = {
  SET_FIELD_VALUE: 'signup_set_field_value',
  RESET_FORM: 'signup_reset_form'
};

export const setFieldValue = ({field, value}) => {
  return {
    type: actionTypes.SET_FIELD_VALUE,
    field,
    value
  };
}

export const resetForm = () => {
  return {
    type: actionTypes.RESET_FORM
  };
}

export const createUser = ({uid, ...fields}) => {
  return dispatch => {
    firebase.database().ref(`/users/${uid}`)
      .set({...fields, createdOn: new Date()})
      .then((i) => {
        dispatch(resetForm())
        console.log(i)
      })
      .catch(e => console.log(e))
  }
}

export const submitForm = () => {
  return (dispatch, getState) => {
    const { email, password, BCode} = getState().signup.form;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        const { uid } = user;
        dispatch(createUser({uid, email, BCode}))
      })
      .catch(e => console.log(e));
  }
}
