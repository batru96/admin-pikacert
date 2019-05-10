// eslint-disable-next-line
import React, { Component } from 'react';
import CustomersTab from '../CustomersTab/index';
import CreditsTab from '../CreditsTab/index';
import CertsTab from '../CertsTab/index';
import PromoTab from '../PromoTab/index';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'CUSTOMERS'
        };
    }
    groupButtons = [
        { id: 'btnCustomers', title: 'Customers', tabname: 'CUSTOMERS' },
        { id: 'btnPromo', title: 'Promo', tabname: 'PROMO' },
        { id: 'btnCredits', title: 'Credits', tabname: 'CREDITS' },
        { id: 'btnCerts', title: 'Certificates', tabname: 'CERTIFICATES' },
    ];

    changeTab(tabname) {
        if (tabname !== this.state.currentTab) {
            this.setState({
                currentTab: tabname
            });
        }
    }

    render() {
        const { currentTab } = this.state;
        return (
            <div className="body-content">
                <div className="tabs-container">
                    {this.groupButtons.map(item => (
                        item.tabname === currentTab ?
                            <button key={item.id} className="tab-button tab-button-active" onClick={() => this.changeTab(item.tabname)}>{item.title}</button>
                            :
                            <button key={item.id} className="tab-button" onClick={() => this.changeTab(item.tabname)}>{item.title}</button>
                    ))}
                </div>
                {currentTab === 'CUSTOMERS' && <CustomersTab />}
                {currentTab === 'PROMO' && <PromoTab />}
                {currentTab === 'CREDITS' && <CreditsTab />}
                {currentTab === 'CERTIFICATES' && <CertsTab />}
            </div>
        )
    }
}

export default Body;
