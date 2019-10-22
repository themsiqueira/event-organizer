import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    data: Yup.array().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'The request is empty' });
  }

  return next();
};
