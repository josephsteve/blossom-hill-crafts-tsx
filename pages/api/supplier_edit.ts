import { NextApiRequest, NextApiResponse } from 'next';
import { updateSupplier } from '@/utils/Fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (_.method !== 'POST') {
    return res.status(405);
  }

  try {
    const supplier = _.body;
    const editedSupplier = await updateSupplier(supplier);
    return res.status(200).json(editedSupplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: 'Something went wrong'});
  }
}
