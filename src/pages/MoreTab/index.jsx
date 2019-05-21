import React, { Component } from 'react';
import Select from '../../components/Select';

class MoreTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: 'HKD'
        };
    }
    UNITS = [
        { id: 'HKD', value: 'HKD' },
        { id: 'USD', value: 'USD' },
        { id: 'VND', value: 'VND' },
    ]

    selectUnit = (event) => {
        this.setState({ unit: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Change default credit</label>
                    <input type="text" className="form-control" />
                </div>
                <div>
                    <div className="form-group">
                        <label>How many credits?</label>
                        <input type="text" className="form-control" />
                    </div>
                    <Select
                        name="Unit"
                        list={this.UNITS}
                        value={this.state.unit}
                        onChange={this.selectUnit}
                    />
                </div>
            </div>
        );
    }
}

export default MoreTab;
