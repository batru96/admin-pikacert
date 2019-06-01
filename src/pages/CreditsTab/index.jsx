import React, { Component } from 'react';
import TableTab from "../../components/TableTab";
import Modal from "../../components/Modal";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import { getCredits, addCredit } from '../../api/creditApis';
import { getCustomers } from '../../api/customerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Utils from '../../helpers/utils';
import { MAX_ROW } from '../../helpers/constants';

class CreditsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credits: [],
            customers: [],
            currentTab: 0,
            tabButtons: [],
            isOpenAddingForm: false,
            isProcessing: false,
            addingError: null,
            selectedCustomerId: ""
        };
        this.data = null;
        this.addNewCredit = this.addNewCredit.bind(this);
        this.selectCustomer = this.selectCustomer.bind(this);
    }
    FieldInputs = [
        { id: 'credit', name: 'Credit', type: 'number', value: '', min: 10, isRequired: true },
        { id: 'description', name: 'Description', type: 'textarea', value: '', isRequired: true },
        { id: 'amount', name: 'Amount paid', type: 'number', value: '', min: 0, isRequired: true },
        { id: 'currency', name: 'Currency', type: 'text', value: '', isRequired: true },
        { id: 'paymentMethod', name: 'Payment method', type: 'text', value: '', isRequired: true }
    ];

    componentDidMount() {
        this.loadCredits();
        this.loadCustomers();
    }

    loadCredits() {
        const { currentTab } = this.state;
        getCredits().then(data => {
            this.data = data;
            const maxPage = Math.ceil(this.data.length / MAX_ROW);
            const tabButtons = [];
            for (let i = 0; i < maxPage; i++) {
                tabButtons.push({ id: i });
            }

            const credits = Utils.getCreditsByTabIndex(this.data, currentTab, MAX_ROW);
            this.setState({ credits, tabButtons });
        }).catch(error => console.log(error));
    }

    loadCustomers() {
        getCustomers()
            .then(data => {
                const customers = data.map(item => ({
                    id: item.id,
                    value: item.organisationName
                }));
                if (customers.length > 0) {
                    this.setState({
                        customers,
                        selectedCustomerId: customers[0].id
                    });
                }
            }).catch(error => {
                console.log(error);
            });
    }

    changeTab(tabId) {
        const credits = Utils.getCreditsByTabIndex(this.data, tabId, MAX_ROW);
        this.setState({ currentTab: tabId, credits });
    }

    addNewCredit() {
        if (this.state.selectedCustomerId === "") {
            this.setState({
                addingError: "Mising customer!"
            });
        } else {
            this.setState({ isProcessing: true });
            const newCredit = this.state.fieldInputsState;
            newCredit['customerId'] = this.state.selectedCustomerId;
            addCredit(newCredit)
                .then(data => {
                    if (data.error === true) {
                        this.setState({
                            isProcessing: false,
                            addingError: data.message
                        });
                    } else {
                        this.setState({
                            isProcessing: false,
                            fieldInputsState: {},
                            isOpenAddingForm: false
                        });
                        this.loadCredits();
                    }
                }).catch(error => console.log(error));
        }
    }

    selectCustomer(event) {
        this.setState({ selectCustomerId: event.target.value });
    }

    startSearch = (event) => {
        const data = Utils.getDataFromSearch(this.data, "orgName", event.target.value);
        const maxPage = Math.ceil(data.length / MAX_ROW);
        const tabButtons = [];
        for (let i = 0; i < maxPage; i++) {
            tabButtons.push({ id: i });
        }

        const credits = Utils.getCreditsByTabIndex(data, 0, MAX_ROW);
        this.setState({ credits, tabButtons });
    }

    render() {
        const { credits, customers, tabButtons, currentTab, isProcessing, addingError, isOpenAddingForm } = this.state;
        return (
            <div>
                <button onClick={() => this.setState({ isOpenAddingForm: true })} className="add-button">Add</button>
                <div className="row" style={{ marginBottom: 5 }}>
                    <div className="col">
                        <TableTab
                            currentTab={currentTab}
                            tabButtons={tabButtons}
                            changeTab={this.changeTab.bind(this)}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" onChange={this.startSearch} />
                    </div>
                </div>
                <div className="table-responsive">
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
                            {credits.map((item) => (
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
                <Modal
                    visible={isOpenAddingForm}
                    attrs={{
                        isAdding: isProcessing,
                        addingError: addingError,
                        title: "Add credit"
                    }}
                    save={this.addNewCredit}
                    closeDialog={() => this.setState({ isOpenAddingForm: false })}
                >
                    <Select
                        onChange={this.selectCustomer}
                        value={this.state.selectedCustomerId}
                        list={customers}
                        name="Organisation"
                    />
                    {this.FieldInputs.map(item => <TextInput key={item.id} item={item} target={this} />)}
                </Modal>
            </div>
        );
    }
}

export default CreditsTab;
