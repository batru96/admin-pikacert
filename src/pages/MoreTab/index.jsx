import React, { Component } from 'react';
import Select from '../../components/Select';
import { getConfig, changeCredit, changePricing } from "../../api/configApis";

class MoreTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credit: 0,
            unit: '',
            totalCreditPerOne: 0
        };
        this.updateCredit = this.updateCredit.bind(this);
        this.updatePricing = this.updatePricing.bind(this);
    }
    UNITS = [
        { id: 'HKD', value: 'HKD' },
        { id: 'USD', value: 'USD' },
        { id: 'VND', value: 'VND' },
    ]

    componentDidMount() {
        getConfig()
            .then(data => {
                this.setState({
                    credit: data.defaultCredit,
                    unit: data.pricing.unit,
                    totalCreditPerOne: data.pricing.totalCreditPerOne
                });
            }).catch(error => {
                console.log(error)
            });
    }

    selectUnit = (event) => {
        this.setState({ unit: event.target.value });
    }

    onChangeInput = (event, id) => {
        const value = event.target.value;
        switch (id) {
            case "credit":
                this.setState({ credit: value });
                break;
            case "total":
                this.setState({ totalCreditPerOne: value });
                break;
            default:
                break;
        }
    }

    updateCredit() {
        changeCredit(this.state.credit)
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    updatePricing() {
        const { unit, totalCreditPerOne } = this.state;
        changePricing({ unit, total: totalCreditPerOne })
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    render() {
        const { credit, unit, totalCreditPerOne } = this.state;
        return (
            <div>
                <div className="form-group-custom">
                    <div className="form-group">
                        <label>Change default credit</label>
                        <input type="number" className="form-control" value={credit} onChange={(event) => this.onChangeInput(event, "credit")} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={this.updateCredit}>Change credit</button>
                </div>
                <div className="form-group-custom">
                    <Select
                        name="Unit"
                        list={this.UNITS}
                        value={unit}
                        onChange={this.selectUnit}
                    />
                    <div className="form-group">
                        <label>How many credits for 1 {unit}?</label>
                        <input type="number" className="form-control" value={totalCreditPerOne} onChange={(event) => this.onChangeInput(event, "total")} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={this.updatePricing}>Change pricing</button>
                </div>
            </div>
        );
    }
}

export default MoreTab;
