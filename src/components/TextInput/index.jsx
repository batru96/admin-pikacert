import React, { Component } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({ value });
        if (this.props.target) {
            let fieldInputsState = this.props.target.state.fieldInputsState ? this.props.target.state.fieldInputsState : null;
            if (fieldInputsState == null)
                fieldInputsState = {};
            fieldInputsState[this.props.item.id] = value;
            this.props.target.setState({ fieldInputsState });
        }
    }

    render() {
        const { id, name, type, isRequired } = this.props.item;
        return (
            <div className="form-group">
                <label>{name}</label>
                <input id={id} value={this.state.value} className="form-control" type={type} required={isRequired} onChange={this.onChange} />
            </div>
        );
    }
}

export default TextInput;
