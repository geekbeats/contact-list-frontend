import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts($search: String) {
    getContacts(search: $search) {
      id
      name
      email
      phone
    }
  }
`;
