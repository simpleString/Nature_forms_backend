/*
  Warnings:

  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserToken";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "result" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserResult_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
