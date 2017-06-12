import React from 'react';
import { app } from 'app';

import Post from 'components/post';

export default class Posts extends React.Component {
    state = {
        posts: []
    }

    componentWillMount() {
        app.prismic.getPosts()
            .then(posts => {
                this.setState({ posts: posts.results });
            });
    }

    render() {
        return <div className="posts">
            {
                this.state.posts.map(post =>
                    <Post key={ post.uid }
                        post={ post } />
                )
            }
        </div>;
    }
}
