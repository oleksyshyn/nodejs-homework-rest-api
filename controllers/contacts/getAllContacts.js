const Contact = require("../../models/contact");

async function getAll(req, res, next) {
  // console.log(req.user);
  // const { _id } = req.user;

  const userId = req.user._id;
  try {
    const docs = await Contact.find({ owner: userId }).exec();
    return res.json(docs);
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;
