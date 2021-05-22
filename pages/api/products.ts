import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../../utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'GET') {
    return res.status(405);
  }

  try {
    const data = await getProducts();
    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
