function getByDate(docs, requireDate) {
    return docs.map(e => ({
        "_id": e.id,
        "description": e.description,
        "amount": e.amount,
        "date": e.date.toISOString().split('T')[0],
        "__v": e.__v
    })).filter(e => e.date === requireDate);
}

function getByAmount(docs, min, max, minInclusive, maxInclusive) {
    if (minInclusive && maxInclusive) return docs.filter(doc => doc.amount >= min && doc.amount <= max)
    else if (minInclusive && !maxInclusive) return docs.filter(doc => doc.amount >= min && doc.amount < max)
    else if (!minInclusive && maxInclusive) return docs.filter(doc => doc.amount > min && doc.amount <= max)
    else return docs.filter(doc => doc.amount > min && doc.amount < max)
}

module.exports = {
    getByDate,
    getByAmount
}