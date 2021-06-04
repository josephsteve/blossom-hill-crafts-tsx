import { NextApiRequest, NextApiResponse } from 'next';
import { getProductsCount } from '@/utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'GET') {
    return res.status(405);
  }

  try {
    let status: any = '';
    if (_.query) { status = _.query.status; }
    //console.log(status);
    const data = await getProductsCount(status);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
