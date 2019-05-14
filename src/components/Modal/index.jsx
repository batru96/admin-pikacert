import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../Loading/index';
import ErrorMessage from '../ErrorMessage/index';

class Modal extends Component {
    submit(event) {
        event.preventDefault();
        this.props.save();
    }

    render() {
        const { isAdding, addingError, title } = this.props.attrs;
        return (
            <div style={{
                display: this.props.visible ? 'block' : 'none'
            }} className="custom-modal">
                <form className="custom-dialog" onSubmit={this.submit.bind(this)}>
                    <div className="dialog-header">
                        <h5>{title}</h5>
                        <FontAwesomeIcon onClick={() => this.props.closeDialog()} className="btn-close-dialog" icon="times-circle" />
                    </div>
                    <hr />
                    <div className="dialog-body">
                        {this.props.children}
                    </div>
                    <hr />
                    <div className="dialog-footer">
                        <button type="submit" className="dialog-button">Save</button>
                    </div>
                    <Loading visible={isAdding} />
                    <ErrorMessage error={addingError} />
                </form>
            </div>
        );
    }
}

export default Modal;
