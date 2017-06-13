import React from 'react';
import Cat from 'components/cat';

export default function ErrorC() {
    return <div className="row">
        <div className="column">
            <p>An error occurred...</p>
            <Cat />
        </div>
    </div>;
}
