import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
// import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
// library.add(faEnvelope, faKey);
import '../css/social_follow.css';

export default function SocialFollow() {
    return (
        <div className="social-container">
            <h6>@avarnajain</h6>
            <a href="https://github.com/avarnajain" 
                target="_blank"
                className="github social">
                <FontAwesomeIcon icon={faGithub} size="2x"/>
            </a>
            <a href="https://www.linkedin.com/in/avarnajain/" 
                target="_blank"
                className="linkedin social">
                <FontAwesomeIcon icon={faLinkedin} size="2x"/>
            </a>
            <a href="https://twitter.com/avarna_jain" 
                target="_blank"
                className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x"/>
            </a>
        </div>
    )
}