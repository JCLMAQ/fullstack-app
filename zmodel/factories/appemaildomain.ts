import { faker } from "@faker-js/faker";
import { Prisma } from '../prisma_new/schema.prisma/client.ts';


export const fakeAppEmailDomain = (): Prisma.AppEmailDomainCreateInput => ({
  domain: faker.internet.domainName(),
  allowed: faker.datatype.boolean()
});
