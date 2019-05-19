// eslint-disable-next-line
import React, { Component } from 'react';
import CustomersTab from '../CustomersTab';
import CreditsTab from '../CreditsTab';
import CertsTab from '../CertsTab';
import PromoTab from '../PromoTab';
import BatchesTab from '../BatchesTab';
import BackgroundsTab from '../BackgroundsTab';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'BACKGROUNDS'
        };
    }
    groupButtons = [
        { id: 'btnCustomers', title: 'Customers', tabname: 'CUSTOMERS' },
        { id: 'btnCredits', title: 'Credits', tabname: 'CREDITS' },
        { id: 'btnCerts', title: 'Certificates', tabname: 'CERTIFICATES' },
        { id: 'btnBatches', title: 'Batches', tabname: 'BATCHES' },
        { id: 'btnPromo', title: 'Promo', tabname: 'PROMO' },
        { id: 'btnBackgrounds', title: 'Backgrounds', tabname: 'BACKGROUNDS' },
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
                {currentTab === 'CREDITS' && <CreditsTab />}
                {currentTab === 'CERTIFICATES' && <CertsTab />}
                {currentTab === 'BATCHES' && <BatchesTab />}
                {currentTab === 'PROMO' && <PromoTab />}
                {currentTab === 'BACKGROUNDS' && <BackgroundsTab />}
            </div>
        )
    }
}

export default Body;
