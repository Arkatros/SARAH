/*
  Warnings:

  - You are about to drop the column `zipcode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `apc` on the `Midwife` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `APC` to the `Midwife` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Address] DROP COLUMN [zipcode];
ALTER TABLE [dbo].[Address] ADD [zipCode] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Midwife] DROP COLUMN [apc];
ALTER TABLE [dbo].[Midwife] ADD [APC] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [lastname];
ALTER TABLE [dbo].[User] ADD [lastName] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
