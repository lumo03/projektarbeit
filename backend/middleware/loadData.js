const loadData = (req, res, next) => {
    res.send(JSON.stringify(SAMPLE_DATA));
    next();
};

module.exports = loadData;