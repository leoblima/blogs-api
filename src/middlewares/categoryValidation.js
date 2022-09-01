const empty = (value) => !value;

const error = {
 nameIsEmpty: '"name" is required',
};

const checkCategory = async (req, res, next) => {
 const { name } = req.body;
switch (true) {
 case empty(name): return res.status(400).json({ message: error.nameIsEmpty });
 default:
  break;
}

next();
};

module.exports = { checkCategory };