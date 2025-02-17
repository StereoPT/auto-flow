'use server';

import { symmetricEncrypt } from '@/lib/encryption';
import prisma from '@/lib/prisma';
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from '@/schema/credentials';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export const CreateCredential = async (form: createCredentialSchemaType) => {
  const { success, data } = await createCredentialSchema.safeParseAsync(form);
  if (!success) {
    throw new Error('Invalid Form Data!');
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  const encryptedValue = symmetricEncrypt(data.value);
  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error('Failed to create credential!');
  }

  revalidatePath('/credentials');
};
