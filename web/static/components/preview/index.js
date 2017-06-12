import React from 'react';
import { app } from 'app';

import qs from 'querystring';

export default class Preview extends React.Component {

    componentWillMount() {
        const params = qs.parse(this.props.location.search.slice(1));

        app.prismic.preview(params.token)
            .then(url => {
                this.props.history.push(url);
            });
    }

    render() {
        return <p>Loading preview...</p>;
    }
}
