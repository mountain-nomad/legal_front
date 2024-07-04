import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    console.log(`Email received: ${email}`);
    res.status(200).json({ message: 'Email logged successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

  