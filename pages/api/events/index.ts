import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const {events} =require("./data.json")

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.status(200).json(events)
  }
    