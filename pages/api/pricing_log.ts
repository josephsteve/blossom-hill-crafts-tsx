import { NextApiRequest, NextApiResponse } from 'next';
import { getPricingLogByProductId } from '@/utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'GET') {
    return res.status(405);
  }

  try {
    let id: any = '';
    if (_.query) { id = _.query.id; }
    //console.log(id);
    const data = await getPricingLogByProductId(id);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
