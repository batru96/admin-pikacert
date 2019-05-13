import React, { Component } from 'react';
import Modal from '../Modal/index';
import getCustomer from '../../api/getCustomers';
import deleteCustomer from '../../api/deleteCustomer';
import addCustomer from '../../api/addCustomer';
import { countCertType, convertDateToString } from '../../helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CustomersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isOpenAddingForm: false,
            isAdding: false
        };
    }

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers() {
        getCustomer((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                data.forEach(customer => {
                    const numbersOfType = countCertType(customer.certs);
                    customer['countCertDraft'] = numbersOfType.countCertDraft;
                    customer['countCertOnline'] = numbersOfType.countCertOnline;
                    const date = new Date(customer.createdAt);
                    customer['signUpDate'] = convertDateToString(date);
                });
                this.setState({ customers: data });
            }
        });
    }

    addCustomer(customer) {
        this.setState({
            isAdding: true
        });

        addCustomer(customer)
            .then(data => {
                this.setState({
                    isOpenAddingForm: false,
                    isAdding: false,
                });
                this.loadCustomers();
            }).catch(error => {
                alert(error);
                this.setState({
                    isAdding: false,
                });
            })
    }

    closeDialog() {
        this.setState({
            isOpenAddingForm: false
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
        const { customers, isOpenAddingForm, isAdding } = this.state;
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
                    visible={isOpenAddingForm}
                    isAdding={isAdding}
                    closeDialog={this.closeDialog.bind(this)}
                    save={this.addCustomer.bind(this)}
                />
            </div>
        );
    }
}

export default CustomersTab;
