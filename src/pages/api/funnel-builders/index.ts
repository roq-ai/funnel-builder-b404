import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { funnelBuilderValidationSchema } from 'validationSchema/funnel-builders';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFunnelBuilders();
    case 'POST':
      return createFunnelBuilder();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFunnelBuilders() {
    const data = await prisma.funnel_builder
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'funnel_builder'));
    return res.status(200).json(data);
  }

  async function createFunnelBuilder() {
    await funnelBuilderValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.block?.length > 0) {
      const create_block = body.block;
      body.block = {
        create: create_block,
      };
    } else {
      delete body.block;
    }
    const data = await prisma.funnel_builder.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
