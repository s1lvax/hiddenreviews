-- DropTable
DROP TABLE IF EXISTS "BookReview";

-- DropTable
DROP TABLE IF EXISTS "MovieReview";

-- CreateTable
CREATE TABLE "MediaReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL, -- Can be 'book' or 'movie'
    "type" TEXT NOT NULL, -- Green or Red
    "username" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL
);
