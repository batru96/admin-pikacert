import React, { Component } from 'react';

class MoreTab extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Change default credit</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>How many credits per one US dollar?</label>
                    <input type="text" className="form-control" />
                </div>
            </div>
        );
    }
}
/*
OPTIONS
[]
defaultCredits: number
PRICING: HOW many credits per one US dollar?


*/
export default MoreTab;
