import React from 'react';
import { GithubIcon, FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from '../assets/icons'
const Bottom = () => {
    return (
        <div className="btm-wrpr">

            <div className="ic-cntr" >
                <LinkedinIcon />
                <InstagramIcon />
                <TwitterIcon />
                <FacebookIcon />
                <GithubIcon />
            </div>
            <div className="dev-tg">
                <span> Develope with passion by Suhas S Suryavanshi</span>
            </div>
        </div>
    );
};

export default Bottom;