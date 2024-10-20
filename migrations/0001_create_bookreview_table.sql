-- CreateTable
CREATE TABLE "BookReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bookId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "review" TEXT NOT NULL
);
