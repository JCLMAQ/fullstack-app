import { PermissionClaim } from '@prisma/prisma';

export const Permission = {
    ...PermissionClaim,
  };

export type PermissionType = PermissionClaim; // | ...other permission enums
