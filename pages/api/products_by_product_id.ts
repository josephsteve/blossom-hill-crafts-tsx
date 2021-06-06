import { NextApiRequest, NextApiResponse } from 'next';
import { getProductByProductId } from '@/utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'GET') {
    return res.status(405);
  }

  try {
    let product_id: any = '';
    if (_.query) { product_id = _.query.product_id; }
    console.log(product_id);
    const data = await getProductByProductId(Number(product_id));
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
