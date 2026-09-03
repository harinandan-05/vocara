-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "githubContext" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);
