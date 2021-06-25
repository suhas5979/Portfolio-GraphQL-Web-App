import React, { useState } from 'react';
import { useMutation} from 'react-apollo';
import { UserIcon } from '../assets/icons';
import { CommentList } from '../components';
import { query,addComment as mutation } from './queries';

const CommentBox = (props) => {
    
    const [addComment,{data}] = useMutation(mutation);
    const { user } = props;
    
    function submitComment(e) {
        if (e.key === 'Enter'){
            clickHandler();
        }
    }
    function clickHandler(comment) {
        addComment({
            variables: {
                text: comment,
                userId: user.id
            },
            refetchQueries: [{ query }]
        });
    }
    function checkExist() {
        // if (props.user === 'undefined' || props.user === null) window.alert("you must be logged in")
    }
    console.log({props,data})
    return (
        <div className="comment-wrpr">
            <div className="comment-header">
                <h3>Comments</h3>
            </div>
            <CommentList user={user} />
            <CommentInput user={user} onClick={(e)=>{
                clickHandler(e.value);
            }} />
        </div>
    )
}
const CommentInput = ({onClick,user}) => {
    const [comment, setComment] = useState('');
    function renderUser() {
        
        if (!user) return <div className="avtar"><UserIcon /></div>;
        return <img alt ="" className="user-picture" src={user.profileUrl} />
    }
    return (
        <div>
         <div className="comment-ip-wrpr">
                {renderUser()}
                <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="add a comment" />
                <button onClick={()=>{
                    onClick({value:comment});
                    setComment('');}} >Send</button>
            </div>   
        </div>
    );
}
export default CommentBox;