// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser } from '@/utils/user';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        console.log(req.body);
        if (name && email && password) {
            const { status, data, error } = await createUser(name, email, password);
            if (status === 'success') {
                res.status(200).json(data)
            } else if (status === 'error') {
                res.status(419).json(error)
            }
        } else {
            res.status(400).json({
                error: 'Please fill all fields'
            })
        }
    }
}
