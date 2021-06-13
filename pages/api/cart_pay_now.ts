import { NextApiRequest, NextApiResponse } from 'next';
import { cartPayNow } from '@/utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'POST') {
    return res.status(405);
  }

  try {
    const data = _.body;
    const cart_total = data.cart_total;
    const cart_details = data.cart_details;
    const newtrans = await cartPayNow(cart_total, cart_details);
    return res.status(200).json(newtrans);
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
