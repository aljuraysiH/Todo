const notFound = (req, res) => {
  res.status(404).json({ message: 'This Route does not exist.' });
};

module.exports = notFound;
