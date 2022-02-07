-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "result" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserResult_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserResult" ("id", "postId", "result", "userId") SELECT "id", "postId", "result", "userId" FROM "UserResult";
DROP TABLE "UserResult";
ALTER TABLE "new_UserResult" RENAME TO "UserResult";
CREATE TABLE "new_Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Test_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Test" ("id", "postId", "title") SELECT "id", "postId", "title" FROM "Test";
DROP TABLE "Test";
ALTER TABLE "new_Test" RENAME TO "Test";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "testId" INTEGER NOT NULL,
    "isRightQuestion" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("id", "isRightQuestion", "name", "testId") SELECT "id", "isRightQuestion", "name", "testId" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
