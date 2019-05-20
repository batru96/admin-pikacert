import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";
import {
    getBackgrounds, addBackground, removeBackground, uploadBackgroundData
} from "../../api/backgroundApis";

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
                orientation: "Portrait",
                imageSource_1: "",
                imageSource_2: "",
            },
        };
        this.imageUpload = null;
        this.imageWithData = null;
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
        const background = this.state.newBackground;
        const file = event.target.files[0]
        const imageURL = URL.createObjectURL(file);
        if (event.target.id === "path") {
            this.imageUpload = file;
            background.imageSource_1 = imageURL;
            this.setState({ newBackground: background });
        } else {
            this.imageWithData = file;
            background.imageSource_2 = imageURL;
            this.setState({ newBackground: background });
        }
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
        fd.append("background", this.imageUpload);

        addBackground(fd)
            .then(data => {
                if (data.error === true) {
                    this.setState({
                        addingError: data.message,
                        isProcessing: false
                    });
                } else {
                    const newFd = new FormData();
                    newFd.append('id', data.id);
                    newFd.append("background", this.imageWithData);

                    uploadBackgroundData(newFd)
                        .then(data => {
                            this.setState({
                                isOpenAddingForm: false,
                                isProcessing: false
                            });
                            this.loadData();
                        });
                }
            }).catch(error => console.log(error));
    }

    delete(background) {
        if (window.confirm(`Are you sure you want to remove "${background.name}"?`)) {
            removeBackground(background.id)
                .then(() => {
                    this.loadData();
                }).catch(error => console.log(error));
        }
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
                                        <button onClick={() => this.delete(background)} className="btn btn-danger btn-flat">
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
                        <label className="form-group-label">Background Name</label>
                        <input id="name" className="form-control" type="text" value={newBackground.name} onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-group-label">Orientation</label>
                        <select className="form-control" id="orientation" value={newBackground.orientation} onChange={this.onChange}>
                            <option value="Portrait">Portrait</option>
                            <option value="Landscape">Landscape</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <label className="form-group-label">Background img (blank)</label>
                            <div className="custom-file">
                                <input id="path" className="custom-file-input" type="file" accept="image/*" onChange={this.onFileChange} required />
                                <label className="custom-file-label">Choose file...</label>
                            </div>
                            <div className="img-background-group">
                                <img alt="Image blank" className="img-background" src={newBackground.imageSource_1} />
                            </div>
                        </div>
                        <div className="col form-group">
                            <label className="form-group-label">Background img (with data)</label>
                            <div className="custom-file">
                                <input id="pathData" className="custom-file-input" type="file" accept="image/*" onChange={this.onFileChange} required />
                                <label className="custom-file-label">Choose file...</label>
                            </div>
                            <div className="img-background-group">
                                <img alt="Image with data" className="img-background" src={newBackground.imageSource_2} />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BackgroundsTab;
