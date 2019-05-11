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
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() > 10 ? dateObject.getMonth() : '0' + dateObject.getMonth();
        const date = dateObject.getDate() > 10 ? dateObject.getDate() : '0' + dateObject.getDate();
        return year + '/' + month + '/' + date;
    }
}