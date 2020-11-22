import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
  query getAccounts($userId: ID!) {
    user(id: $userId) {
      accounts {
        id
        mask
        officialName
        type
        subtype
      }
    }
  }
`;
