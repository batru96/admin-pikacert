import React, { Component } from 'react';
import Modal from '../../components/Modal';
import TextInput from '../../components/TextInput';
import { getCustomers, addCustomer, deleteCustomer } from '../../api/customerApi';
import { countCertType, convertDateToString } from '../../helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CustomersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isOpenAddingForm: false,
            isAdding: false,
            addingError: null,
        };
    }
    FieldInputs = [
        { id: 'firstName', name: 'First name', value: '', type: 'text', isRequired: true },
        { id: 'lastName', name: 'Last name', value: '', type: 'text', isRequired: true },
        { id: 'email', name: 'Email', type: 'email', value: '', isRequired: true },
        { id: 'password', name: 'Password', type: 'password', value: '', isRequired: true },
        { id: 'organisationName', name: 'Organisation', type: 'text', value: '', isRequired: true }
    ];

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers() {
        getCustomers()
            .then(data => {
                data.forEach(customer => {
                    const numbersOfType = countCertType(customer.certs);
                    customer['countCertDraft'] = numbersOfType.countCertDraft;
                    customer['countCertOnline'] = numbersOfType.countCertOnline;
                    const date = new Date(customer.createdAt);
                    customer['signUpDate'] = convertDateToString(date);
                });
                this.setState({ customers: data });
            }).catch(error => alert(error))
    }

    createCustomer() {
        this.setState({
            isAdding: true
        });

        addCustomer(this.state.fieldInputsState)
            .then(data => {
                this.setState({
                    isOpenAddingForm: false,
                    isAdding: false,
                });
                this.loadCustomers();
            }).catch(error => this.setState({
                isAdding: false,
                addingError: error
            }));
    }

    closeDialog() {
        this.setState({
            isOpenAddingForm: false,
            addingError: null
        });
    }

    removeCustomer(customer) {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            deleteCustomer(customer.id)
                .then(data => {
                    if (data === 'OK') {
                        const customers = this.state.customers.filter(item => item.id !== customer.id);
                        this.setState({ customers });
                    } else {
                        alert(data.message);
                    }
                }).catch(error => alert(error));
        }
    }

    render() {
        const { customers, isOpenAddingForm, isAdding, addingError } = this.state;
        return (
            <div className="table-responsive">
                <button onClick={() => this.setState({ isOpenAddingForm: true })} className="add-button">Add</button>
                <table className="table table-bordered table-hover dataTable" role="grid">
                    <thead>
                        <tr className="thead-light" role="row">
                            <th>Organisation</th>
                            <th>Last name</th>
                            <th>First name</th>
                            <th>Cert (draft)</th>
                            <th>Cert (online)</th>
                            <th>Credit Balance</th>
                            <th>Email-1</th>
                            <th>Email-1 Verified</th>
                            <th>Signup Date</th>
                            <th>Org URL</th>
                            <th>URL Verified</th>
                            <th>URL Verified by</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id} role="row">
                                <td>{customer.organisationName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.firstName}</td>
                                <td className="text-center">{customer.countCertDraft}</td>
                                <td className="text-center">{customer.countCertOnline}</td>
                                <td className="text-center">{customer.balance}</td>
                                <td>{customer.email}</td>
                                <td>in development</td>
                                <td>{customer.signUpDate}</td>
                                <td>{customer.orgURL}</td>
                                <td>in development</td>
                                <td>in development</td>
                                <td>
                                    <button onClick={() => this.removeCustomer(customer)} className="btn btn-danger btn-flat">
                                        <FontAwesomeIcon icon="times-circle" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    attrs={{
                        title: 'Add Promo',
                        isAdding,
                        addingError,
                    }}
                    visible={isOpenAddingForm}
                    closeDialog={this.closeDialog.bind(this)}
                    save={this.createCustomer.bind(this)}
                >
                    {this.FieldInputs.map(item => <TextInput key={item.id} item={item} target={this} />)}
                </Modal>
            </div>
        );
    }
}

export default CustomersTab;
