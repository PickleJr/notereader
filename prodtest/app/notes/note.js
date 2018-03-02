import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'react-materialize';

import Loading from '../loading';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voice: 'voice=en-US_MichaelVoice',
        }

        this.apiurl = 'https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/synthesize?accept=audio%2Fmp3&';
        this.apitext = "&text=" + encodeURI(this.props.note);
        this.changeVoice = this.changeVoice.bind(this);
    }

    changeVoice(event) {
        this.setState({voice: event.target.value});
        let audio = document.getElementById("audio" + this.props.index);
        let source = document.getElementById("audioSource" + this.props.index);
        source.src = event.target.value;

        audio.load();
    }

    render() {
        return(
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">
                                {this.props.note.length > 10 ? this.props.note.substring(0,9) + "..." : this.props.note}
                            </span>
                            <audio controls id={"audio" + this.props.index}>
                                <source id={"audioSource" + this.props.index} src={this.apiurl + this.state.voice + this.apitext}/>
                                Your browser does not support audio.
                            </audio>
                            <div className="row">
                            <label>Voice</label>
                            <select value={this.state.voice} onChange={this.changeVoice} className="browser-default">
                                <option value="voice=en-US_MichaelVoice">Michael</option>
                                <option value="voice=en-US_LisaVoice">Lisa</option>
                                <option value="voice=en-US_AllisonVoice">Allison</option>
                                <option value="voice=en-GB_KateVoice">Kate</option>
                            </select>
                            </div>
                            <p className="flow-text">
                                {this.props.note}
                            </p>
                        </div>
                        <div className="card-action">
                            <a href={this.apiurl + this.state.voice + this.apitext} download={"Note" + this.props.index + ".mp3"} className="btn blue btn-spacing">Download MP3</a>
                            <a onClick={this.props.deleteFunction} className="btn red btn-spacing">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}