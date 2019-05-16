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
        const date = dateObject.getDate() > 10 ? dateObject.getDate() : '0' + dateObject.getDate();
        return year + '/' + month + '/' + date;
    }
}