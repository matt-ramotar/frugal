const initialState = {
  userId: localStorage.getItem('userId'),
  token: localStorage.getItem('token'),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
