/*
  Warnings:

  - You are about to drop the column `password` on the `Midwife` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Midwife] DROP COLUMN [password];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [password] NVARCHAR(1000),
[role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'USER';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
