import React from 'react';
import config from 'config';

export default class Sidebar extends React.Component
{
    render() {
        return <div className="off-canvas position-left reveal-for-large" id="my-info" data-off-canvas data-position="left">
            <div className="row">
                <div className="column">
                    <img className="profile thumbnail" src="/images/profile.jpg" alt={ config.fullName } />
                    <h5>{ config.fullName }</h5>
                    <ul className="no-bullet social-list">
                        <li>
                            <a href="https://linkedin.com/in/doubliez" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                                <span className="name">linkedin.com/in/doubliez</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/doubliez" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-github" aria-hidden="true"></i>
                                <span className="name">doubliez</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/doubliez" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                <span className="name">@doubliez</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://stackoverflow.com/story/doubliez" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-stack-overflow" aria-hidden="true"></i>
                                <span className="name">CV</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
