-- CreateTable
CREATE TABLE "Assistant" (
    "id" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);
