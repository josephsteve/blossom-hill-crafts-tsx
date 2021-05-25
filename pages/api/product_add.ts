import { NextApiRequest, NextApiResponse } from 'next';
import { addProduct } from '@/utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'POST') {
    return res.status(405);
  }

  try {
    const product = _.body;
    const createdProduct = await addProduct(product);
    return res.status(200).json(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
