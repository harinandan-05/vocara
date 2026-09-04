/*
  Warnings:

  - Added the required column `interviewId` to the `Assistant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assistant" ADD COLUMN     "interviewId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserTranscript" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTranscript_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTranscript" ADD CONSTRAINT "UserTranscript_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
