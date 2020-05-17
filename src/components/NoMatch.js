import React from 'react';
import Nav from "./shared/Nav";

class NoMatch extends React.Component {

    render() {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col l12 center">
                            <h2>404</h2>
                            <p>Resource does not exist</p>
                        </div>
                    </div>
                </div>
        )
    }

}

export default NoMatch;
