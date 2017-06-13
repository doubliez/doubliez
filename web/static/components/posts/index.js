import React from 'react';
import { app } from 'app';

import ErrorC from 'components/error';
import Post from 'components/post';

export default class Posts extends React.Component
{
    state = {
        intro: null,
        posts: []
    }

    componentWillMount() {
        Promise.all([
            app.prismic.getIntro(),
            app.prismic.getPosts()
        ])
            .then(([intro, posts]) => {
                this.setState({ intro, posts: posts.results });
            })
            .catch(() => {
                this.setState({ error: true });
            });
    }

    render() {
        return <div className="posts">
            {
                !this.state.error ? null :
                    <ErrorC />
            }
            {
                !this.state.intro ? null :
                    <div className="row">
                        <div className="large-10 columns">
                            <div className="responsive-blog-post">
                                <div className="individual-post">
                                    <div className="title"
                                        dangerouslySetInnerHTML={{
                                            __html: this.state.intro.getStructuredText('intro.title').asHtml(app.prismic.linkResolver)
                                        }}
                                    />
                                    <div className="text"
                                        dangerouslySetInnerHTML={{
                                            __html: this.state.intro.getStructuredText('intro.text').asHtml(app.prismic.linkResolver)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            }
            {
                this.state.posts.map(post =>
                    <Post key={ post.uid }
                        post={ post } />
                )
            }
        </div>;
    }
}
