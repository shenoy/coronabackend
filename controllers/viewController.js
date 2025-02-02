const Case = require('../models/caseModel');

exports.getOverview = async (req, res) => {
  //GET TOUR DATA

  const cases = await Case.find().sort('-Date');

  //BUILD TEMPLATE

  //RENDER TEMPLATE USING TOUR DATA

  res.status(200).render('overview', {
    title: 'All Cases',
    cases
  });
};

exports.getDetail = async (req, res) => {
  console.log(req.params.id);
  const cases = await Case.findOne({ _id: req.params.id });
  res.status(200).render('case', {
    Title: 'case',
    cases
  });
};

exports.getDeaths = async (req, res) => {
  const deaths = await Case.find({ Dead: { $gte: 1 } }).sort('-Date');
  res.status(200).render('deaths', {
    title: 'deaths',
    deaths
  });
};

exports.getTotal = async (req, res) => {
  const cases = await Case.findOne({ _id: '5e6972939d68eb1e9983919c' });
  res.status(200).render('total', {
    title: 'total',
    cases
  });
};

exports.getLoginForm = async (req, res) => {
  res.status(200).render('login', {
    title: 'login'
  });
};

exports.getSignupForm = async (req, res) => {
  res.status(200).render('signup', {
    title: 'signup'
  });
};
