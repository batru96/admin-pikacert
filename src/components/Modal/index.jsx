import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    FieldInputs = [
        { id: 'firstName', name: 'First name', type: 'text', isRequired: true },
        { id: 'lastname', name: 'Last name', type: 'text', isRequired: true },
        { id: 'email', name: 'Email', type: 'email', isRequired: true },
        { id: 'customerPassword', name: 'Password', type: 'password', isRequired: true },
        { id: 'organisation', name: 'Organisation', type: 'text', isRequired: true }
    ];

    render() {
        return (
            <div style={{
                display: this.props.visible ? 'block' : 'none'
            }} className="custom-modal">
                <div className="custom-dialog">
                    <div className="dialog-header">
                        <h5>Add Customer</h5>
                        <FontAwesomeIcon onClick={() => this.props.closeDialog()} className="btn-close-dialog" icon="times-circle" />
                    </div>
                    <hr />
                    <div className="dialog-body">
                        {this.FieldInputs.map(item => (
                            <div className="form-group">
                                <label htmlFor="">{item.name}</label>
                                <input className="form-control" type={item.type} />
                            </div>
                            // <TextInput key={item.id} item={item} target={this} />
                        ))}
                    </div>
                    <hr />
                    <div className="dialog-footer">
                        <button className="dialog-button" onClick={() => console.log(this.state)}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
