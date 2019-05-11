import React, { Component } from 'react';
import getCustomer from '../../api/getCustomers';
import { countCertType, convertDateToString } from '../../helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CustomersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    componentDidMount() {

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
                console.log(this.state.customers);
            }
        });
    }

    render() {
        return (
            <div className="table-responsive">
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
                        {this.state.customers.map(customer => (
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
                                    <button ng-click="deleteCustomer(customer)" type="button" className="btn btn-danger btn-flat">
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

export default CustomersTab;
