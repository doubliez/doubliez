import React from 'react';
import { Link } from 'react-router-dom';
import { app } from 'app';

import moment from 'moment';

import NotFound from 'components/not-found';

export default class Post extends React.Component {
    state = {
        post: null
    }

    componentWillMount() {
        if (this.props.post) {
            this.setState({ post: this.props.post });
        } else {
            const uid = this.props.match.params.uid;
            app.prismic.getPostById(uid)
                .then(post => {
                    this.setState({ post });
                });
        }
    }

    render() {
        return <div className="row">
            <div className="large-10 columns">
                {
                    !this.state.post ? <NotFound /> :
                        <div className="responsive-blog-post">
                            <div className="individual-post">
                                <Link className="title"
                                    to={ app.prismic.linkResolver(this.state.post) }
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.post.getStructuredText('blog_post.title').asHtml(app.prismic.linkResolver)
                                    }}
                                />
                                <div className="date">{ moment(this.state.post.getTimestamp('blog_post.timestamp')).fromNow() }</div>
                                <div className="text"
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.post.getStructuredText('blog_post.text').asHtml(app.prismic.linkResolver)
                                    }}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>;
    }
}
