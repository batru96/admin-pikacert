import React, { Component } from 'react';
import TableTab from '../../components/TableTab';
import { getBatches } from '../../api/batchApis';
import { MAX_ROW } from '../../helpers/constants';
import { calculatePages, getBatchesByTabIndex, convertDateToString } from '../../helpers/utils';

export default class BatchesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batches: [],
            currentTab: 0,
            tabButtons: [],
        };
        this.data = null;
    }

    componentDidMount() {
        this.loadData();
    }

    changeTab(tabId) {
        const batches = getBatchesByTabIndex(this.data, tabId, MAX_ROW);
        this.setState({ currentTab: tabId, batches });
    }

    loadData() {
        getBatches()
            .then(data => {
                this.data = data;
                const tablePage = calculatePages(this.data, MAX_ROW);
                const batches = getBatchesByTabIndex(this.data, this.state.currentTab, MAX_ROW);
                this.setState({ tabButtons: tablePage.tabButtons, batches })
                console.log(this.state.batches);
            }).catch(error => console.log(error));
    }

    render() {
        const { batches, currentTab, tabButtons } = this.state;
        return (
            <div>
                <TableTab currentTab={currentTab} tabButtons={tabButtons} changeTab={this.changeTab.bind(this)} />
                <div className="table-responsive">
                    <table className="table table-bordered table-hover dataTable" role="grid">
                        <thead>
                            <tr className="thead-light" role="row">
                                <th>Cust ID</th>
                                <th>Organisation</th>
                                <th>Cert ID</th>
                                <th>Batch ID</th>
                                <th>Count</th>
                                <th>Create Date</th>
                                <th>Status</th>
                                <th>Expiry Date</th>
                                <th>Create by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.customerId}</td>
                                    <td>{item.orgName}</td>
                                    <td>{item.certId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.data.columndata.length}</td>
                                    <td>{convertDateToString(new Date(item.createdAt))}</td>
                                    <td>{item.status}</td>
                                    <td>{convertDateToString(new Date(item.expiryDate))}</td>
                                    <td>{item.customerEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
