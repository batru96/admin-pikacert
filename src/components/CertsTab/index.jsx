import React, { Component } from 'react';
import TableTab from '../TableTab/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCerts } from '../../api/certApis';
import { MAX_ROW } from '../../helpers/constants';
import { calculatePages, getCertsByTabIndex } from '../../helpers/utils';

class CertsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certs: [],
            currentTab: 0,
            tabButtons: [],
        };
        this.data = null;
    }

    componentDidMount() {
        this.loadData();
    }

    changeTab(tabId) {
        const certs = getCertsByTabIndex(this.data, tabId, MAX_ROW);
        this.setState({ currentTab: tabId, certs });
    }

    loadData() {
        getCerts()
            .then(data => {
                this.data = data;
                const tablePage = calculatePages(this.data, MAX_ROW);
                const certs = getCertsByTabIndex(this.data, this.state.currentTab, MAX_ROW);
                this.setState({ tabButtons: tablePage.tabButtons, certs })
                console.log(this.state.certs);
            }).catch(error => console.log(error));
    }

    render() {
        const { certs, currentTab, tabButtons } = this.state;
        return (
            <div>
                <TableTab currentTab={currentTab} tabButtons={tabButtons} changeTab={this.changeTab.bind(this)} />
                <div className="table-responsive">
                    <table className="table table-bordered table-hover dataTable" role="grid">
                        <thead>
                            <tr className="thead-light" role="row">
                                <th>Cert ID</th>
                                <th>Cert name</th>
                                <th>Organisation</th>
                                <th>Cust ID</th>
                                <th>Date published</th>
                                <th>Cert (online)</th>
                                <th>Cert (draft)</th>
                                <th>URL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {certs.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.orgName}</td>
                                    <td>{item.customerId}</td>
                                    <td>{item.datePublished}</td>
                                    <td>{item.totalBatchesOnline}</td>
                                    <td>{item.totalBatchesDraft}</td>
                                    <td>
                                        <a href={`https://test.pikacert.com/publish?id=${item.id}`} target="_blank">https://our.pikacert.com/publish?id={item.id}</a>
                                    </td>
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
            </div>
        );
    }
}

export default CertsTab;
