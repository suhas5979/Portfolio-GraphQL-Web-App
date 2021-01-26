import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import axios from 'axios';
import { Project, CommentBox, Bottom, Header, Dataset ,Service } from '../components'
import { fetchUser as query } from './queries';
const Landing = ({ data: { user } }) => {
    const { projects } = Dataset;
    
    return (
        <div className="landing-wrapper">
            <Header user={user === 'undefined' ? null : user} />
            <h2 className="prj-title">Projects</h2>
            <div className="projects-wrapper">
                {projects.map((project) =>
                    <Project data={project} />)}
            </div>
            <CommentBox user={user === 'undefined' ? null : user} />
            <div className="services-wrapper">
                <Service />
                <Service />
                <Service />
            </div>
            <Bottom />
        </div>
    );
}

export default graphql(query)(Landing);
