-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "frequency" TEXT NOT NULL DEFAULT 'monthly',
ALTER COLUMN "category" SET DEFAULT 'miscellaneous';
