import React, { Component } from 'react';
import getPromos from '../../api/getPromos';
import { convertDateToString } from '../../helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import deletePromo from '../../api/deletePromo';

class PromoTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],
            isOpenAddingForm: false
        }
    }

    componentDidMount() {
        this.loadPromoes();
    }

    loadPromoes() {
        getPromos()
            .then(data => {
                const promos = data.map(promo => {
                    promo['createdAt'] = convertDateToString(new Date(promo['createdAt']));
                    promo['startDate'] = convertDateToString(new Date(promo['startDate']));
                    promo['expiryDate'] = convertDateToString(new Date(promo['expiryDate']));

                    return promo;
                });
                this.setState({ promos });
                // console.log(promos);
            }).catch(error => console.log(error));
    }

    removePromo(promo) {
        if (window.confirm(`Are you sure you want to delete ${promo.code} code`)) {
            deletePromo(promo.id)
                .then(() => {
                    const promos = this.state.promos.filter(item => item.id !== promo.id);
                    this.setState({ promos });
                }).catch(error => console.log(error));
        }
    }

    render() {
        const { promos } = this.state;
        return (
            <div className="table-responsive">
                <button onClick={() => this.setState({ isOpenAddingForm: true })} className="add-button">Add</button>
                <table className="table table-bordered table-hover dataTable" role="grid">
                    <thead>
                        <tr className="thead-light" role="row">
                            <th>Promo Code</th>
                            <th>Description</th>
                            <th>Credit</th>
                            <th>Internal Note</th>
                            <th>Create Date</th>
                            <th>Start Date</th>
                            <th>Expiry Date</th>
                            <th>Create by</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {promos.map(promo => (
                            <tr key={promo.id} role="row">
                                <td>{promo.code}</td>
                                <td>{promo.description}</td>
                                <td>{promo.credit}</td>
                                <td>{promo.note}</td>
                                <td>{promo.createdAt}</td>
                                <td>{promo.startDate}</td>
                                <td>{promo.expiryDate}</td>
                                <td>{promo.adminName}</td>
                                <td className="table-delete-row">
                                    <button onClick={() => this.removePromo(promo)} className="btn btn-danger btn-flat">
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

export default PromoTab;
