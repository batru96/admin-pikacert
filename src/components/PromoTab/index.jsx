import React, { Component } from 'react';
import Modal from '../Modal/index';
import TextInput from '../TextInput/index';
import { convertDateToString } from '../../helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPromos, addPromo, deletePromo } from '../../api/promoApis';

class PromoTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],
            isOpenAddingForm: false,
            isOpenEditingForm: false,
            isProcessing: false,
            addingError: null
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.closeEditDialog = this.closeEditDialog.bind(this);
    }

    FieldInputs = [
        { id: 'code', name: 'Promo Code', type: 'text', isRequired: true, value: '' },
        { id: 'description', name: 'Description', type: 'text', isRequired: true, value: '' },
        { id: 'credit', name: 'Credit', type: 'number', isRequired: true, value: '' },
        { id: 'note', name: 'Note', type: 'text', isRequired: true, value: '' },
        { id: 'startDate', name: 'Start Date', type: 'date', isRequired: true, value: '' },
        { id: 'expiryDate', name: 'Expiry Date', type: 'date', isRequired: true, value: '' },
    ];
    FieldInputsEdit = [];

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

    closeDialog() {
        this.setState({
            isOpenAddingForm: false,
            addingError: null
        });
    }

    closeEditDialog() {
        this.setState({
            isOpenEditingForm: false,
            addingError: false
        })
    }

    addPromo() {
        this.setState({ isProcessing: true });
        addPromo(this.state.fieldInputsState)
            .then(data => {
                this.setState({
                    isProcessing: false,
                    isOpenAddingForm: false
                });
                this.loadPromoes();
            }).catch(error => {
                this.setState({
                    isProcessing: false,
                    addingError: error
                });
            });
    }

    openEditForm(promo) {
        this.FieldInputsEdit = this.FieldInputs.map((item) => {
            if (item.id === 'code') item.disabled = true;
            item.value = promo[item.id];
            return item;
        });
        this.setState({ isOpenEditingForm: true });
    }

    editPromo(promo) {
        this.setState({ isProcessing: true });
        setTimeout(() => {
            this.setState({
                isProcessing: false,
                isOpenEditingForm: false
            });
        }, 3000);
    }

    render() {
        const { promos, isProcessing, addingError, isOpenAddingForm, isOpenEditingForm } = this.state;
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
                                    <button onClick={() => this.openEditForm(promo)} className="btn btn-success btn-flat mr-2">
                                        <FontAwesomeIcon icon="pen-square" />
                                    </button>
                                    <button onClick={() => this.removePromo(promo)} className="btn btn-danger btn-flat">
                                        <FontAwesomeIcon icon="times-circle" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal attrs={{
                    title: 'Add Promo',
                    isAdding: isProcessing,
                    addingError,
                }}
                    visible={isOpenAddingForm}
                    closeDialog={this.closeDialog}
                    save={this.addPromo.bind(this)}
                >
                    {this.FieldInputs.map(item => <TextInput key={item.id} item={item} target={this} />)}
                </Modal>
                <Modal attrs={{
                    title: 'Edit Promo',
                    isAdding: isProcessing,
                    addingError
                }}
                    visible={isOpenEditingForm}
                    closeDialog={this.closeEditDialog}
                    save={this.editPromo.bind(this)}
                >
                    {this.FieldInputsEdit.map(item => <TextInput key={item.id} item={item} target={this} />)}
                </Modal>
            </div >
        );
    }
}

export default PromoTab;
