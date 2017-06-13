import React from 'react';
import { app } from 'app';

import qs from 'querystring';

import ErrorC from 'components/error';

export default class Preview extends React.Component
{
    state = {}

    componentWillMount() {
        const params = qs.parse(this.props.location.search.slice(1));

        app.prismic.preview(params.token)
            .then(url => {
                this.props.history.push(url);
            })
            .catch(() => {
                this.setState({ error: true });
            });
    }

    render() {
        return <div className="row">
            <div className="column">
                <p>Loading preview...</p>
                {
                    !this.state.error ? null :
                        <ErrorC />
                }
            </div>
        </div>;
    }
}
