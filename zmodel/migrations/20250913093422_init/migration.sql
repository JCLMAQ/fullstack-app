-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."TaskState" AS ENUM ('CREATION', 'STANDBY', 'RUNNING', 'DONE');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."TodoState" AS ENUM ('CREATION', 'STANDBY', 'RUNNING', 'DONE');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."Gender" AS ENUM ('MALE', 'FEMELE', 'UNKNOWN', 'NONE');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."Title" AS ENUM ('Mr', 'Mme', 'Dct');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."Position" AS ENUM ('Manager', 'Member', 'Secretary');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."Language" AS ENUM ('en', 'fr');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."Role" AS ENUM ('GUEST', 'USER', 'ADMIN', 'SUPERADMIN', 'REGULAR');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."PermissionClaim" AS ENUM ('CreateCoffee', 'UpdateCoffee', 'DeleteCoffee');

-- CreateEnum
CREATE TYPE "fullstack_app_monorepo_DB"."TokenType" AS ENUM ('EMAIL', 'API', 'FORGOT', 'ACCOUNT', 'REFREZH');

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Organization" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "isDeleted" INTEGER DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" JSON,
    "emailITAdmin" TEXT NOT NULL,
    "webSite" TEXT,
    "mainOrgId" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."OrgEmail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "description" TEXT,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "OrgEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."OrgDomain" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "domainName" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "OrgDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."User" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "isDeleted" INTEGER DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "title" "fullstack_app_monorepo_DB"."Title",
    "nickName" TEXT,
    "Gender" "fullstack_app_monorepo_DB"."Gender" DEFAULT 'UNKNOWN',
    "social" JSON,
    "Language" "fullstack_app_monorepo_DB"."Language" DEFAULT 'en',
    "photoUrl" TEXT,
    "dob" TIMESTAMP(3),
    "address" JSON,
    "isValidated" TIMESTAMP(3),
    "isSuspended" TIMESTAMP(3),
    "managerId" TEXT,
    "Roles" "fullstack_app_monorepo_DB"."Role"[],
    "Permissions" "fullstack_app_monorepo_DB"."PermissionClaim"[],
    "isTfaEnable" BOOLEAN NOT NULL DEFAULT false,
    "tfaSecret" TEXT,
    "passWordFaker" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."UserSecret" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "pwdHash" TEXT,
    "salt" TEXT,
    "isAdmin" BOOLEAN DEFAULT false,

    CONSTRAINT "UserSecret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Profile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "orderProfile" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Group" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "orderGroup" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActiv" TIMESTAMP(3),
    "orgId" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Todo" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "orderTodo" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "todoState" "fullstack_app_monorepo_DB"."TodoState" NOT NULL DEFAULT 'CREATION',
    "mainTodo" TEXT,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."UserTodoLink" (
    "userId" TEXT NOT NULL,
    "todoId" TEXT NOT NULL,
    "isAuthor" BOOLEAN NOT NULL DEFAULT true,
    "isAssigned" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "UserTodoLink_pkey" PRIMARY KEY ("userId","todoId")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Task" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "orderTask" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "taskState" "fullstack_app_monorepo_DB"."TaskState" NOT NULL DEFAULT 'CREATION',
    "mainTask" TEXT,
    "todoId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."UserTaskLink" (
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "isAuthor" BOOLEAN NOT NULL DEFAULT true,
    "isAssigned" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "UserTaskLink_pkey" PRIMARY KEY ("userId","taskId")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Post" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "orderPost" INTEGER,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Category" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "isDeleted" INTEGER DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "orderCategory" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Comment" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "isDeleted" INTEGER DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "orderComment" INTEGER NOT NULL,
    "content" TEXT,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."File" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "storageName" TEXT NOT NULL,
    "type" TEXT,
    "data" TEXT,
    "size" INTEGER,
    "isArchived" TIMESTAMP(3),

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."UserFollower" (
    "user_id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFollower_pkey" PRIMARY KEY ("user_id","follower_id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."PostLike" (
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Story" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "isDeleted" INTEGER DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "caption" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Image" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "associated_id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."ConfigParam" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "utility" TEXT NOT NULL,

    CONSTRAINT "ConfigParam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."OrgEmailUseTo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "useTo" TEXT NOT NULL,
    "isActiv" BOOLEAN NOT NULL,
    "emailOrgId" INTEGER NOT NULL,

    CONSTRAINT "OrgEmailUseTo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."AppEmailDomain" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "domain" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL,

    CONSTRAINT "AppEmailDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."RefreshToken" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."ApiKey" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "key" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Scope" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "scope" TEXT NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."Token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "tokenId" TEXT,
    "type" "fullstack_app_monorepo_DB"."TokenType" NOT NULL,
    "emailToken" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."ChangesTracking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" INTEGER NOT NULL DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "doneAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedById" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "newData" JSONB NOT NULL,
    "oldData" JSONB NOT NULL,

    CONSTRAINT "ChangesTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."AccountValidation" (
    "id" TEXT NOT NULL,
    "numSeq" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN DEFAULT false,
    "isPublic" BOOLEAN DEFAULT true,
    "isDeleted" INTEGER DEFAULT 0,
    "isDeletedDT" TIMESTAMP(3),
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "emailToken" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_OrganizationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrganizationToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_UsersProfiles" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UsersProfiles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_GroupToTask" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupToTask_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_GroupToTodo" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupToTodo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_GroupToPost" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupToPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_PostsCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostsCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_FileToGroup" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FileToGroup_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "fullstack_app_monorepo_DB"."_apikeysscopes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_apikeysscopes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "fullstack_app_monorepo_DB"."Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "fullstack_app_monorepo_DB"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSecret_userId_key" ON "fullstack_app_monorepo_DB"."UserSecret"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "File_storageName_key" ON "fullstack_app_monorepo_DB"."File"("storageName");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigParam_name_key" ON "fullstack_app_monorepo_DB"."ConfigParam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AppEmailDomain_domain_key" ON "fullstack_app_monorepo_DB"."AppEmailDomain"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "fullstack_app_monorepo_DB"."RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenId_key" ON "fullstack_app_monorepo_DB"."RefreshToken"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_tokenId_key" ON "fullstack_app_monorepo_DB"."Token"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_emailToken_key" ON "fullstack_app_monorepo_DB"."Token"("emailToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccountValidation_emailToken_key" ON "fullstack_app_monorepo_DB"."AccountValidation"("emailToken");

-- CreateIndex
CREATE INDEX "_OrganizationToUser_B_index" ON "fullstack_app_monorepo_DB"."_OrganizationToUser"("B");

-- CreateIndex
CREATE INDEX "_UsersProfiles_B_index" ON "fullstack_app_monorepo_DB"."_UsersProfiles"("B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "fullstack_app_monorepo_DB"."_GroupToUser"("B");

-- CreateIndex
CREATE INDEX "_GroupToTask_B_index" ON "fullstack_app_monorepo_DB"."_GroupToTask"("B");

-- CreateIndex
CREATE INDEX "_GroupToTodo_B_index" ON "fullstack_app_monorepo_DB"."_GroupToTodo"("B");

-- CreateIndex
CREATE INDEX "_GroupToPost_B_index" ON "fullstack_app_monorepo_DB"."_GroupToPost"("B");

-- CreateIndex
CREATE INDEX "_PostsCategory_B_index" ON "fullstack_app_monorepo_DB"."_PostsCategory"("B");

-- CreateIndex
CREATE INDEX "_FileToGroup_B_index" ON "fullstack_app_monorepo_DB"."_FileToGroup"("B");

-- CreateIndex
CREATE INDEX "_apikeysscopes_B_index" ON "fullstack_app_monorepo_DB"."_apikeysscopes"("B");

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Organization" ADD CONSTRAINT "Organization_mainOrgId_fkey" FOREIGN KEY ("mainOrgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."OrgEmail" ADD CONSTRAINT "OrgEmail_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."OrgDomain" ADD CONSTRAINT "OrgDomain_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserSecret" ADD CONSTRAINT "UserSecret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "fullstack_app_monorepo_DB"."User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Group" ADD CONSTRAINT "Group_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Todo" ADD CONSTRAINT "Todo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Todo" ADD CONSTRAINT "Todo_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Todo" ADD CONSTRAINT "Todo_mainTodo_fkey" FOREIGN KEY ("mainTodo") REFERENCES "fullstack_app_monorepo_DB"."Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserTodoLink" ADD CONSTRAINT "UserTodoLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserTodoLink" ADD CONSTRAINT "UserTodoLink_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "fullstack_app_monorepo_DB"."Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Task" ADD CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Task" ADD CONSTRAINT "Task_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Task" ADD CONSTRAINT "Task_mainTask_fkey" FOREIGN KEY ("mainTask") REFERENCES "fullstack_app_monorepo_DB"."Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Task" ADD CONSTRAINT "Task_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "fullstack_app_monorepo_DB"."Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserTaskLink" ADD CONSTRAINT "UserTaskLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserTaskLink" ADD CONSTRAINT "UserTaskLink_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "fullstack_app_monorepo_DB"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Post" ADD CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Post" ADD CONSTRAINT "Post_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "fullstack_app_monorepo_DB"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."File" ADD CONSTRAINT "File_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."File" ADD CONSTRAINT "File_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserFollower" ADD CONSTRAINT "UserFollower_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."UserFollower" ADD CONSTRAINT "UserFollower_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."PostLike" ADD CONSTRAINT "PostLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."PostLike" ADD CONSTRAINT "PostLike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "fullstack_app_monorepo_DB"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Story" ADD CONSTRAINT "Story_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."OrgEmailUseTo" ADD CONSTRAINT "OrgEmailUseTo_emailOrgId_fkey" FOREIGN KEY ("emailOrgId") REFERENCES "fullstack_app_monorepo_DB"."OrgEmail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."ApiKey" ADD CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."ChangesTracking" ADD CONSTRAINT "ChangesTracking_modifiedById_fkey" FOREIGN KEY ("modifiedById") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_UsersProfiles" ADD CONSTRAINT "_UsersProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_UsersProfiles" ADD CONSTRAINT "_UsersProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToTask" ADD CONSTRAINT "_GroupToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToTask" ADD CONSTRAINT "_GroupToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToTodo" ADD CONSTRAINT "_GroupToTodo_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToTodo" ADD CONSTRAINT "_GroupToTodo_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToPost" ADD CONSTRAINT "_GroupToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_GroupToPost" ADD CONSTRAINT "_GroupToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_PostsCategory" ADD CONSTRAINT "_PostsCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_PostsCategory" ADD CONSTRAINT "_PostsCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_FileToGroup" ADD CONSTRAINT "_FileToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_FileToGroup" ADD CONSTRAINT "_FileToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_apikeysscopes" ADD CONSTRAINT "_apikeysscopes_A_fkey" FOREIGN KEY ("A") REFERENCES "fullstack_app_monorepo_DB"."ApiKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fullstack_app_monorepo_DB"."_apikeysscopes" ADD CONSTRAINT "_apikeysscopes_B_fkey" FOREIGN KEY ("B") REFERENCES "fullstack_app_monorepo_DB"."Scope"("id") ON DELETE CASCADE ON UPDATE CASCADE;
