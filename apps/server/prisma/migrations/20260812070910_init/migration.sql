-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Attended" INTEGER NOT NULL,
    "Github" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Instructor" TEXT NOT NULL,
    "MeetingId" INTEGER NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "Status" TEXT NOT NULL,
    "Score" INTEGER NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
