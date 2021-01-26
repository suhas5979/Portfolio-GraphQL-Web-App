import React from 'react';
const Project = ({data}) => { 
    const { image, title, description,tech } = data;
    return (
        <div className="project-wrpr">
            <img alt="" src={require(`../assets/${image}`)} />
            <h2>{title}</h2>
            <span >{description}</span>
            <ul>{tech.map((e)=>
            <li key={e}>{e}</li>)}</ul>
            <a className="prj-btn" href="/" >CheckOut</a>
        </div>
    )
}

export default Project;
