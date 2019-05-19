import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";
import { getBackgrounds, addBackground } from "../../api/backgroundApis";

class BackgroundsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgrounds: [],
            isOpenAddingForm: false,
            isProcessing: false,
            addingError: null,
            newBackground: {
                name: "",
                orientation: "portrait"
            },
        };
        this.imageUpload = null;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        getBackgrounds()
            .then(data => {
                this.setState({ backgrounds: data });
            }).catch(error => console.log(error));
    }

    onChange = event => {
        const { newBackground } = this.state;
        newBackground[event.target.id] = event.target.value;
        this.setState({ newBackground });
    }

    onFileChange = event => {
        this.imageUpload = event.target.files[0];
    }

    addNewBackground = () => {
        this.setState({
            isProcessing: true,
            addingError: ""
        });
        const { name, orientation } = this.state.newBackground;
        const fd = new FormData();
        fd.append("name", name);
        fd.append("orientation", orientation);
        fd.append("background", this.imageUpload, this.imageUpload.name);

        addBackground(fd)
            .then(data => {
                if (data.error === true) {
                    this.setState({
                        addingError: data.message,
                        isProcessing: false
                    });
                } else {
                    this.setState({
                        isOpenAddingForm: false,
                        isProcessing: false
                    });
                    this.loadData();
                }
                console.log(data);
            }).catch(error => console.log(error));
    }

    openEditForm(background) {

    }

    removeBackground() {

    }
    render() {
        const { backgrounds, isProcessing, addingError, isOpenAddingForm, newBackground } = this.state;
        return (
            <div>
                <button onClick={() => this.setState({ isOpenAddingForm: true })} className="add-button">Add</button>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover dataTable">
                        <thead>
                            <tr className="thead-light" role="row">
                                <th>Background ID</th>
                                <th>Name</th>
                                <th>Image blank</th>
                                <th>Image data</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {backgrounds.map(background => (
                                <tr key={background.id}>
                                    <td>{background.id}</td>
                                    <td>{background.name}</td>
                                    <td>{background.path}</td>
                                    <td>{background.pathData}</td>
                                    <td>{background.type}</td>
                                    <td className="table-delete-row">
                                        <button onClick={() => this.openEditForm(background)} className="btn btn-success btn-flat mr-2">
                                            <FontAwesomeIcon icon="pen-square" />
                                        </button>
                                        <button onClick={() => this.removeBackground(background)} className="btn btn-danger btn-flat">
                                            <FontAwesomeIcon icon="times-circle" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    visible={isOpenAddingForm}
                    attrs={{
                        isAdding: isProcessing,
                        addingError: addingError,
                        title: "Add background"
                    }}
                    save={this.addNewBackground}
                    closeDialog={() => this.setState({ isOpenAddingForm: false })}
                >
                    <div className="form-group">
                        <label className="font-weight-bold">Background Name</label>
                        <input id="name" className="form-control" type="text" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Orientation</label>
                        <select className="form-control" id="orientation" value="portrait" onChange={this.onChange}>
                            <option value="Portrait">Portrait</option>
                            <option value="Landscape">Landscape</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Background img (blank)</label>
                        <input id="path" className="form-control-file" type="file" onChange={this.onFileChange} required />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BackgroundsTab;
