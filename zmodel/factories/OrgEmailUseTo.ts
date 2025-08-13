import { faker } from "@faker-js/faker";
import { OrgEmail, Prisma } from '../prisma_new/schema.prisma/client.ts';

export const fakeOrgEmailUseTo = (emailOrg: OrgEmail): Prisma.OrgEmailUseToCreateInput => {
  const useTo = faker.lorem.sentence(5);
  const isActiv = faker.datatype.boolean();

  return { useTo, isActiv, emailOrg: { connect: { id: emailOrg.id }} };

};
