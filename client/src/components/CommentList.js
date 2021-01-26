import React from 'react';
import { useQuery } from 'react-apollo';
import { query } from './queries';
import { Comment } from '../components'

const CommentList = ({ user }) => {
    const { loading, error, data } = useQuery(query);

    if (loading) {
        return <ul className="comment-list"><h3 style={{textAlign:'center'}}>Loading....</h3></ul>
    }
    if (error) {
        return <ul className="comment-list"> <li>Something Went Wrong</li></ul>
    }
    if (data != null && data != 'undefined') {
        const { allComments} = data;
        return (
            <ul className="comment-list">
                {allComments != null && allComments != 'undefined' && allComments.map((comment) =>
                    <Comment user={user} key={comment.id} comment={comment} />
                )}
            </ul>
        )
    }
    
}

export default CommentList;