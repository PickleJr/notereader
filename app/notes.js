import React from 'react';
import ReactDOM from 'react-dom';
import FileSaver from 'file-saver';
import Loading from './loading';

import Note from './notes/note';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addNoteValue: '',
            notes: [],
            loading: false
        };
        this.showDownloadMSG = true;
        this.showDownloatCounter = 1;

        this.handleAddNoteChange = this.handleAddNoteChange.bind(this);
        this.clearAddNote = this.clearAddNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.readFile = this.readFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    handleAddNoteChange(event) {
        this.setState({addNoteValue: event.target.value});
    }

    clearAddNote(event) {
        this.setState({addNoteValue: ''});
    }

    addNote(event) {
        let prevState = this.state;
        prevState.notes.push(this.state.addNoteValue);
        prevState.addNoteValue = '';
        this.setState(prevState);

        Materialize.toast('New note was added!', 1000, 'rounded');
        if(this.showDownloadMSG) {
            Materialize.toast("Don't forget to download your notes for later!", 5000, 'rounded', () => {
                this.showDownloadMSG = false;
            });
            Materialize.toast("If you do, they'll be gone forever!", 5000, 'rounded', () => {
                this.showDownloadMSG = false;
            });
            if(this.showDownloatCounter++ > 3) {
                this.showDownloadMSG = false;
            }
        }
    }

    removeNote(target) {
        this.setState({
            notes: this.state.notes.filter(note => note !== target)
        });
    }

    readFile(event) {
        this.setState({loading: true});
        let reader = new FileReader();
        let file = event.target.files[0];
        let fileExtension = /\.nrn$/;

        if(file.name.match(fileExtension)) {
            let that = this;
            let prevState = this.state;
            prevState.loading = false;

            reader.onload = function(e) {
                try {
                    let notes = JSON.parse(reader.result);
                    if(!(notes.every((i) => { return typeof i === "string" }))){
                        throw "File contains modified values, not everything is a string.";
                    }
                    prevState.notes = prevState.notes.concat(notes);
                } catch (e) {
                    alert("Problem reading file.\n" + e);
                } finally {
                    that.setState(prevState);
                }
            }
            reader.readAsText(file);

        } else {
            alert("File type is unreadable");
        }

        event.target.value = null;
    }

    downloadFile(event) {
        this.showDownloadMSG = false;
        let blob = new Blob([JSON.stringify(this.state.notes)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "notes.nrn");
    }

    render() {
        return(
            <div className="row">
                <div className="col m8 offset-m2 s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Add Note</span>
                                    <div className="input-field">
                                        <textarea className="materialize-textarea" id="add_note"
                                            value={this.state.addNoteValue} onChange={this.handleAddNoteChange}
                                            data-length="5000"
                                        />
                                        <label htmlFor="add_note">Note</label>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <a className="hover" onClick={this.addNote}>Add Note</a>
                                    <a className="hover" onClick={this.clearAddNote}>Clear</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h2>Your Notes</h2>
                            <div className="row">
                                <div className="btn green btn-spacing">
                                    <input type="file" onChange={this.readFile} name="upload" id="upload" className="upload_file" />
                                    <label htmlFor="upload" className="white-text">Upload Previous Notes</label>
                                </div>
                                <a className="btn purple btn-spacing" onClick={this.downloadFile}>Download Notes for Later</a>
                            </div>
                            {this.state.loading ? <Loading/> : this.state.notes.map((value,index) => (
                                <Note deleteFunction={() => {this.removeNote(value)}} key={index} index={index} note={value}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}