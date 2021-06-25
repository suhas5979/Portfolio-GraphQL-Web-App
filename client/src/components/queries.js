import gql from 'graphql-tag';

const query = gql`
query{
    allComments{
      id
      text
      likes
      date
      user{
        profileUrl
        name
      }
    }
  }
`;

const addComment = gql`
mutation addComment($text:String,$userId:String){
    addComment(text:$text,userId:$userId){
      id
    }
  }
`;

const likeComment = gql`
mutation likeComment($user:String,$id:String,$payload:Int){
    likeComment(id:$id,user:$user,payload:$payload){
      id
    }
  }`;

const fetchUser = gql`
  query{
      user{
      name 
      id
      profileUrl
      }
  }
`;
const logoutUser = gql`
mutation logout{
    logOut{
      name
    }
  }`;
const refetchUser = gql`
  query{
      user{
      name 
      }
  }
`;
export { query, fetchUser, addComment, likeComment, logoutUser, refetchUser };