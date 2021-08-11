import { gql } from "apollo-boost";
import { USER_INFO, POST_DATA } from "./fragments";

export const PROFILE = gql`
  query {
    profile {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      username
      name
      email
      images {
        url
        public_id
      }
      about
    }
  }
`;

export const ALL_USERS = gql`
  query {
    allUsers {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const TOTAL_POST = gql`
  query {
    totalPosts
  }
`

export const GET_ALL_POST = gql`
  query allPosts($limit: Int, $page: Int, $search: String){
    allPosts(limit: $limit, page: $page, search: $search) {
      posts {
        ...postData
      },
      page,
      pages,
      total
    }
  }
  ${POST_DATA}
`;

export const POSTS_BY_USER = gql`
  query postsByUser($limit: Int, $page: Int, $search: String) {
    postsByUser (limit: $limit, page: $page, search: $search) {
      posts {
        ...postData
      }
      page,
      pages,
      total
    }
  }
  ${POST_DATA}
`;

export const POST_SHOW = gql`
  query postShow($id: ID!) {
    postShow (id: $id) {
      ...postData
    }
  }
  ${POST_DATA}
`;


