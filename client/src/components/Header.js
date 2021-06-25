import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { logoutUser as mutation, refetchUser as query } from './queries'
const Header = ({ user }) => {
    const [logOut, { data }] = useMutation(mutation);
    function renderUser() {
        if (!user) {
            return <a className="nav-btn" href="/api/auth/google" >Sign In</a>
        }
        return <div className="nav-user">
            <img alt="" className="header-user-pic" src={user.profileUrl} />
            <button className="nav-btn" onClick={logout} > Log out</button>
        </div>
    }
    function logout() {
        if (user) {
            logOut({
                refetchQueries: [{ query }]
            });
        }
    }
    console.log({ user })
    return (
        <div className="header-wrpr">
            <span className="logo">Suryavanshi</span>
            <div className="spacer" />
            {renderUser()}
        </div>
    );
};

export default Header;