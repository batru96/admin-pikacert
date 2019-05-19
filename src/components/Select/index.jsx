import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
    render() {
        const { list, selectedCustomerId } = this.props;
        return (
            <div className="form-group">
                <label className="font-weight-bold">Organisation</label>
                <select className="form-control" value={selectedCustomerId} onChange={this.props.onChange}>
                    {list.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    list: PropTypes.array,
    name: PropTypes.string,
    selectedCustomerId: PropTypes.string
};

export default Select;
