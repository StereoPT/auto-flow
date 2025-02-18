import { getCreditsPack, PackId } from '@/types/billing';
import 'server-only';
import Stripe from 'stripe';
import prisma from '../prisma';

export const HandleCheckoutSessionCompleted = async (
  event: Stripe.Checkout.Session,
) => {
  if (!event.metadata) {
    throw new Error('Missing Metadata');
  }

  const { userId, packId } = event.metadata;

  if (!userId) {
    throw new Error('Missing UserId');
  }

  if (!packId) {
    throw new Error('Missing PackId');
  }

  const purchasedPack = getCreditsPack(packId as PackId);
  if (!purchasedPack) {
    throw new Error('Purchased Pack not Found!');
  }

  await prisma.userBalance.upsert({
    where: { userId },
    create: {
      userId,
      credits: purchasedPack.credits,
    },
    update: {
      credits: {
        increment: purchasedPack.credits,
      },
    },
  });
};
