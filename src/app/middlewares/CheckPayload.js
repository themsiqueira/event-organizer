export default async (req, res, next) => {
  const { data } = req.body;

  if (data.length <= 0)
    return res.status(400).json({ error: 'The request is empty' });

  return next();
};
