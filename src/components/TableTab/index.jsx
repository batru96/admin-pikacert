import React, { Component } from 'react';

class TableTab extends Component {
    render() {
        const { tabButtons, currentTab } = this.props;
        return (
            <div className="table-tab-container">
                <button onClick={() => this.props.changeTab(0)} className="previous-btn">Previous</button>
                {tabButtons.map((item, index) => (
                    item.id === currentTab ?
                        <button key={item.id} className="table-tab-btn-active">{index + 1}</button>
                        : <button key={item.id} className="table-tab-btn" onClick={() => this.props.changeTab(item.id)}>{index + 1}</button>
                ))}
                <button onClick={() => this.props.changeTab(tabButtons.length - 1)} className="previous-btn">Next</button>
            </div>
        );
    }
}

export default TableTab;