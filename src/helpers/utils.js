module.exports = {
    countCertType: countCertType,
    convertDateToString: convertDateToString,
    calculatePages: calculatePages,
    getCertsByTabIndex: getCertsByTabIndex,
    getBatchesByTabIndex: getBatchesByTabIndex,
    getCreditsByTabIndex: getCreditsByTabIndex,
    searchWholeWord: searchWholeWord,
    getDataFromSearch: getDataFromSearch
}

function countCertType(certs) {
    let countCertDraft = 0;
    let countCertOnline = 0;

    for (let i = 0; i < certs.length; i++) {
        if (certs[i].status === 'Draft') countCertDraft++;
        else if (certs[i].status === 'Published') countCertOnline++;
    }

    return { countCertDraft, countCertOnline };
}

function convertDateToString(dateObject) {
    let month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    if (month < 10) month = '0' + month;
    const date = dateObject.getDate() >= 10 ? dateObject.getDate() : '0' + dateObject.getDate();
    return year + '-' + month + '-' + date;
}

function calculatePages(data, maxRow) {
    const maxPage = Math.ceil(data.length / maxRow);
    const tabButtons = [];
    for (let i = 0; i < maxPage; i++) {
        tabButtons.push({ id: i });
    }
    return { maxPage, tabButtons };
}

function getCertsByTabIndex(data, currentTab, MAX_ROW) {
    return data.filter((item, index) => {
        if (index >= MAX_ROW * currentTab && index < (MAX_ROW * currentTab + MAX_ROW)) {
            return item;
        }
        return null;
    });
}

function getBatchesByTabIndex(data, currentTab, MAX_ROW) {
    return data.filter((item, index) => {
        if (index >= MAX_ROW * currentTab && index < (MAX_ROW * currentTab + MAX_ROW)) {
            return item;
        }
        return null;
    });
}

function getCreditsByTabIndex(data, currentTab, MAX_ROW) {
    return data.filter((item, index) => {
        if (index >= MAX_ROW * currentTab && index < (MAX_ROW * currentTab + MAX_ROW)) {
            item['createdAt'] = convertDateToString(new Date(item['createdAt']));
            return item;
        }
        return null;
    });
}

function searchWholeWord(string, value) {
    // Check non-English character
    if (value.match(/[^\x00-\x7F]+/) != null) {
        if (string.indexOf(value) !== -1) return true;
        return false;
    }

    const values = value.split(' ');
    const strings = string.split(' ');
    const results = [];

    let currentStringIndex = 0;
    for (let i = 0; i < values.length; i++) {
        results[i] = false;
        for (; currentStringIndex < strings.length; currentStringIndex++) {
            if (values[i] === strings[currentStringIndex]) {
                results[i] = true;
                break;
            }
        }
    }

    for (let i = 0; i < results.length; i++) {
        if (results[i] === false)
            return false;
    }
    return true;
}

function getDataFromSearch(data, key, searchText) {
    return data.filter(item => {
        if (item[key] && searchWholeWord(item[key], searchText)) return item;
        return null;
    });
}