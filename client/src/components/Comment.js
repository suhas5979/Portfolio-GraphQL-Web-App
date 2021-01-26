import React from 'react';
import { useMutation } from 'react-apollo';
import { query, likeComment as mutation } from './queries';
import { UserIcon, HeartIcon, TimeIcon } from '../assets/icons';


const Comment = (props) => {
    const [likeComment, { data }] = useMutation(mutation);
    const { comment, user } = props;
    function calculateTimeDiff(time) {
        if (time.getFullYear() === (new Date()).getFullYear()) {
            if (time.getMonth() === (new Date()).getMonth()) {
                if (time.getDate() === (new Date()).getDate()) {
                    if (time.getHours() === (new Date()).getHours()) {
                        return `${(new Date()).getMinutes() - time.getMinutes()}min`;
                    }
                    return `${(new Date()).getHours() - time.getHours()}h`;
                }
                return `${(new Date()).getDate() - time.getDate()}d`;
            }
            return `${(new Date()).getMonth() - time.getMonth()}m`;
        }
        return `${(new Date()).getFullYear() - time.getFullYear()}y`;

    }
    function renderUrl(url) {
        if (!url) return <div className="avtar"><UserIcon /></div>;
        return <img alt="" className="user-picture" src={url} />
    }
    console.log(props)
    return (
        <li >
            {renderUrl(comment.user.profileUrl)}
            <div className="comment-content">
                <div className="cmt-up">
                    <span className="comment-user">{comment.user.name}</span>
                    <span className="comment-time" ><TimeIcon /> {calculateTimeDiff(new Date(comment.date))}</span>
                </div>
                <span className="comment-text">{comment.text}</span>
                <div className="cmt-info"><HeartIcon onClick={() => {
                    likeComment({
                        variables: { user: user.id, id: comment.id, payload: comment.likes + 1 },
                        refetchQueries: [{ query }]
                    });
                }} /><span>{`${comment.likes} likes`}</span></div>
            </div>
        </li>
    );
};

export default Comment;