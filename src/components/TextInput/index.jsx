import React, { Component } from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.item.value
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
        const { value } = this.state;
        const { id, name, type, isRequired, disabled, min } = this.props.item;
        return (
            <div className="form-group">
                <label className="font-weight-bold">{name}</label>
                {(type !== 'textarea' && type !== 'select') &&
                    <input
                        id={id}
                        value={value}
                        className="form-control"
                        type={type}
                        required={isRequired}
                        onChange={this.onChange}
                        disabled={disabled}
                        min={min}
                    />
                }
                {type === "textarea" &&
                    <textarea
                        id={id}
                        className="form-control"
                        required={isRequired}
                        onChange={this.onChange}
                        disabled={disabled}
                        defaultValue={value}
                        rows="5"
                    />
                }
            </div>
        );
    }
}

export default TextInput;
