/*
  Warnings:

  - A unique constraint covering the columns `[playerId,title]` on the table `Quest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "QuestEmbeddings" (
    "id" SERIAL NOT NULL,
    "embedding" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "creationTitle" TEXT NOT NULL,
    "creationDescription" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "rewardGold" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestEmbeddings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quest_playerId_title_key" ON "Quest"("playerId", "title");
