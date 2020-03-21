const Case = require('../models/caseModel');
const APIFeatures = require('../utils/APIFeatures');

//const cases = JSON.parse(fs.readFileSync(`${__dirname}/../cases.json`));

exports.aliasTopCases = async (req, res, next) => {
  req.query.limit = '10';
  req.query.sort = '-Dead, -Confirmed';
  req.query.fields = 'County,Location,Origin,Website,Dead,Confirmed';
  next();
};

exports.getAllCases = async (req, res) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Case.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const cases = await features.query;
    res.status(200).json({
      status: 'success',
      results: cases.length,
      data: {
        case: cases
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getCase = async (req, res) => {
  try {
    const cases = await Case.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: cases.length,
      data: {
        cases
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body);
    res.status(201).json({
      status: 'success',
      case: newCase
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent'
    });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',

      data: {
        case: updatedCase
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'deleted the file'
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getCaseStats = async (req, res) => {
  try {
    const stats1 = await Case.aggregate([
      { $group: { _id: '$County', confirmedByCounty: { $sum: '$Confirmed' } } },

      { $sort: { confirmedByCounty: -1 } }
    ]);

    const stats2 = await Case.aggregate([
      {
        $group: {
          _id: null,
          totalConfirmed: { $sum: '$Confirmed' },
          totalDead: { $sum: '$Dead' },
          maxConfirmed: { $max: '$Confirmed' }
        }
      }
    ]);

    const stats3 = await Case.aggregate([
      {
        $group: {
          _id: '$Date',
          dailyTotal: { $sum: '$Confirmed' },
          totalDead: { $sum: '$Dead' }
        }
      }
    ]);
    res.status(200).json({
      status: 'success',

      data: {
        case: stats1,
        stats2,
        stats3
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};
