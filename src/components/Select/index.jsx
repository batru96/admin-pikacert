import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
    render() {
        const { name, list, value } = this.props;
        return (
            <div className="form-group">
                <label style={{ fontWeight: 500 }}>{name}</label>
                <select className="form-control" value={value} onChange={this.props.onChange}>
                    {list.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    list: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default Select;
