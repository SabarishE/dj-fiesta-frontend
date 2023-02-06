import { EventInterface } from './../../../types/event';
import type { NextApiRequest, NextApiResponse } from 'next'

const {events} =require("./data.json")

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const event=events.filter((e:EventInterface)=>e.slug===req.query.slug)

    res.status(200).json(event)
  }
    