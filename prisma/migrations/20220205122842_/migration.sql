/*
  Warnings:

  - Added the required column `rightQuestionId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rightQuestionId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Test_rightQuestionId_fkey" FOREIGN KEY ("rightQuestionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Test_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Test" ("id", "postId", "title") SELECT "id", "postId", "title" FROM "Test";
DROP TABLE "Test";
ALTER TABLE "new_Test" RENAME TO "Test";
CREATE UNIQUE INDEX "Test_rightQuestionId_key" ON "Test"("rightQuestionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
