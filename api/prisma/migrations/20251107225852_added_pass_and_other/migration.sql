/*
  Warnings:

  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `Midwife` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Midwife` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Midwife] ADD [isActive] BIT NOT NULL,
[password] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [fullname];
ALTER TABLE [dbo].[User] ADD [lastname] NVARCHAR(1000) NOT NULL,
[name] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
