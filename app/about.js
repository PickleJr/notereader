import React from 'react';
import ReactDOM from 'react-dom';

export default class About extends React.Component {
    render() {
        return(
            <div className="row">
                <div className="col m8 offset-m2 s10 offset-s1">
                    <h1>About</h1>
                    <p className="flow-text">
                        Many People like to listen to audiobooks or podcasts while doing mindless tasks such as
                        cleaning up around the house, going for a run or working out, driving to work, and even sleeping.
                    </p>
                    <p className="flow-text">
                        Some people (mostly myself) put off studying their notes by claiming they are too busy to study.
                    </p>
                    <p className="flow-text">
                        What if you could study your notes by listening to them during mindless tasks?
                    </p>
                    <p className="flow-text">
                        Just type in your notes, and then listen to your notes!
                    </p>
                    <p className="flow-text">
                        Unfortunately we cannot save your notes yet.
                    </p>
                </div>
            </div>
        );
    }
}