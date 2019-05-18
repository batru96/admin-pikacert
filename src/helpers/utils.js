module.exports = {
    countCertType: (certs) => {
        let countCertDraft = 0;
        let countCertOnline = 0;

        for (let i = 0; i < certs.length; i++) {
            if (certs[i].status === 'Draft') countCertDraft++;
            else if (certs[i].status === 'Published') countCertOnline++;
        }

        return { countCertDraft, countCertOnline };
    },
    convertDateToString: (dateObject) => {
        let month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        if (month < 10) month = '0' + month;
        const date = dateObject.getDate() >= 10 ? dateObject.getDate() : '0' + dateObject.getDate();
        return year + '-' + month + '-' + date;
    },
    calculatePages: (data, maxRow) => {
        const maxPage = Math.ceil(data.length / maxRow);
        const tabButtons = [];
        for (let i = 0; i < maxPage; i++) {
            tabButtons.push({ id: i });
        }
        return { maxPage, tabButtons };
    },
    getCertsByTabIndex: (data, currentTab, MAX_ROW) => {
        return data.filter((item, index) => {
            if (index >= MAX_ROW * currentTab && index < (MAX_ROW * currentTab + MAX_ROW)) {
                return item;
            }
            return null;
        });
    },
    getBatchesByTabIndex: (data, currentTab, MAX_ROW) => {
        return data.filter((item, index) => {
            if (index >= MAX_ROW * currentTab && index < (MAX_ROW * currentTab + MAX_ROW)) {
                return item;
            }
            return null;
        });
    }
}