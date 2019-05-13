import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextInput from '../TextInput/index';
import Loading from '../Loading/index';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    FieldInputs = [
        { id: 'firstName', name: 'First name', type: 'text', isRequired: true },
        { id: 'lastName', name: 'Last name', type: 'text', isRequired: true },
        { id: 'email', name: 'Email', type: 'email', isRequired: true },
        { id: 'password', name: 'Password', type: 'password', isRequired: true },
        { id: 'organisationName', name: 'Organisation', type: 'text', isRequired: true }
    ];

    submit(event) {
        event.preventDefault();
        this.props.save(this.state.fieldInputsState);
    }

    render() {
        return (
            <div style={{
                display: this.props.visible ? 'block' : 'none'
            }} className="custom-modal">
                <form className="custom-dialog" onSubmit={this.submit.bind(this)}>
                    <div className="dialog-header">
                        <h5>Add Customer</h5>
                        <FontAwesomeIcon onClick={() => this.props.closeDialog()} className="btn-close-dialog" icon="times-circle" />
                    </div>
                    <hr />
                    <div className="dialog-body">
                        {this.FieldInputs.map(item => <TextInput key={item.id} item={item} target={this} />)}
                    </div>
                    <hr />
                    <div className="dialog-footer">
                        <button type="submit" className="dialog-button">Save</button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Loading visible={this.props.isAdding} />
                    </div>
                </form>
            </div>
        );
    }
}

export default Modal;
