import React, { Component } from 'react';
import { getCredits } from '../../api/creditApis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDateToString } from '../../helpers/utils';
import { MAX_ROW } from '../../helpers/constants';
import TableTab from '../TableTab/index';

class CreditsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credits: [],
            currentTab: 0,
            tabButtons: []
        };
        this.data = null;
    }

    componentDidMount() {
        this.loadCredits();
    }

    loadCredits() {
        getCredits().then(data => {
            this.data = data;
            const maxPage = Math.ceil(this.data.length / MAX_ROW);
            const tabButtons = [];
            for (let i = 0; i < maxPage; i++) {
                tabButtons.push({ id: i });
            }

            const credits = this.getCreditsByTabIndex(this.state.currentTab);
            this.setState({ credits, tabButtons });
        }).catch(error => console.log(error));
    }

    changeTab(tabId) {
        const credits = this.getCreditsByTabIndex(tabId);
        this.setState({ currentTab: tabId, credits });
    }

    getCreditsByTabIndex(currentTab) {
        return this.data.filter((item, index) => {
            if (index >= MAX_ROW * currentTab && index < (MAX_ROW * currentTab + MAX_ROW)) {
                item['createdAt'] = convertDateToString(new Date(item['createdAt']));
                return item;
            }
            return null;
        });
    }

    render() {
        const { credits, tabButtons, currentTab } = this.state;
        return (
            <div className="table-responsive">
                <button onClick={() => this.setState({ isOpenAddingForm: true })} className="add-button">Add</button>
                <TableTab currentTab={currentTab} tabButtons={tabButtons} changeTab={this.changeTab.bind(this)} />
                <table className="table table-bordered table-hover dataTable" role="grid">
                    <thead>
                        <tr className="thead-light" role="row">
                            <th>Organisation</th>
                            <th>Date/time</th>
                            <th>Transaction Description</th>
                            <th>Credit</th>
                            <th>Payment Method</th>
                            <th>Payment Reference</th>
                            <th>Amount paid</th>
                            <th>Currency</th>
                            <th>Batch ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {credits.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.orgName}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.description}</td>
                                <td>{item.credit}</td>
                                <td>{item.paymentMethod}</td>
                                <td className="payment-ref">{item.paymentRef}</td>
                                <td>{item.amount}</td>
                                <td>{item.currency}</td>
                                <td>{item.batchId}</td>
                                <td className="table-delete-row">
                                    <button onClick={() => this.removeCredit()} className="btn btn-danger btn-flat">
                                        <FontAwesomeIcon icon="times-circle" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CreditsTab;
