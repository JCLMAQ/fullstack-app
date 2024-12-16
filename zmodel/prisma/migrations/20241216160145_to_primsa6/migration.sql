-- AlterTable
ALTER TABLE "_FileToGroup" ADD CONSTRAINT "_FileToGroup_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_FileToGroup_AB_unique";

-- AlterTable
ALTER TABLE "_GroupToPost" ADD CONSTRAINT "_GroupToPost_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupToPost_AB_unique";

-- AlterTable
ALTER TABLE "_GroupToTask" ADD CONSTRAINT "_GroupToTask_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupToTask_AB_unique";

-- AlterTable
ALTER TABLE "_GroupToTodo" ADD CONSTRAINT "_GroupToTodo_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupToTodo_AB_unique";

-- AlterTable
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GroupToUser_AB_unique";

-- AlterTable
ALTER TABLE "_OrganizationToUser" ADD CONSTRAINT "_OrganizationToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_OrganizationToUser_AB_unique";

-- AlterTable
ALTER TABLE "_PostsCategory" ADD CONSTRAINT "_PostsCategory_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PostsCategory_AB_unique";

-- AlterTable
ALTER TABLE "_UsersProfiles" ADD CONSTRAINT "_UsersProfiles_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UsersProfiles_AB_unique";

-- AlterTable
ALTER TABLE "_apikeysscopes" ADD CONSTRAINT "_apikeysscopes_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_apikeysscopes_AB_unique";
