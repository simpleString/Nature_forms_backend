/*
  Warnings:

  - You are about to drop the column `rightQuestionId` on the `Test` table. All the data in the column will be lost.
  - Added the required column `isRightQuestion` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "testId" INTEGER NOT NULL,
    "isRightQuestion" BOOLEAN NOT NULL,
    CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("id", "name", "testId") SELECT "id", "name", "testId" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Test_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Test" ("id", "postId", "title") SELECT "id", "postId", "title" FROM "Test";
DROP TABLE "Test";
ALTER TABLE "new_Test" RENAME TO "Test";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
