import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      id
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      loggedIn
      id
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
      id
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout($id: ID!) {
    logout(_id: $id) {
      loggedIn
    }
  }
`;

export const UPSERT_GOOGLE_USER = gql`
  mutation upsertGoogleUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $googleId: String
    $picture: String
  ) {
    upsertGoogleUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      googleId: $googleId
      picture: $picture
    ) {
      id
      token
    }
  }
`;
