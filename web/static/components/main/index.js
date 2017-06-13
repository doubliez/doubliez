import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import config from 'config';

import Sidebar from 'components/sidebar';
import Posts from 'components/posts';
import Post from 'components/post';
import Preview from 'components/preview';

export default class Main extends React.Component
{
    render() {
        return <main>
            <div className="off-canvas-wrapper">
                <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
                    <Sidebar />

                    <div className="off-canvas-content" data-off-canvas-content>
                        <div className="title-bar hide-for-large">
                            <div className="title-bar-left">
                                <button className="menu-icon" type="button" data-open="my-info"></button>
                                <span className="title-bar-title">{ config.fullName }</span>
                            </div>
                        </div>

                        <div className="content">
                            <Switch>
                                <Route exact path="/" component={ Posts } />
                                <Route exact path="/preview" component={ Preview } />
                                <Route path="/:uid" render={ routeProps =>
                                    <div className="posts">
                                        <div className="row">
                                            <div className="column">
                                                <div className="home">
                                                    <Link to="/">
                                                        <i className="fa fa-home" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <Post { ...routeProps } />
                                    </div> } />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </main>;
    }
}
