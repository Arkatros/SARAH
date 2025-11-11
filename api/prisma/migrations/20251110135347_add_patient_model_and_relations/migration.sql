BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Address] DROP CONSTRAINT [Address_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Midwife] DROP CONSTRAINT [Midwife_userId_fkey];

-- CreateTable
CREATE TABLE [dbo].[Patient] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dateOfBirth] DATETIME2,
    [ethnicity] NVARCHAR(1000),
    [residentialStatus] NVARCHAR(1000),
    [partnerName] NVARCHAR(1000),
    [partnerDateOfBirth] DATETIME2,
    [partnerAddress] NVARCHAR(1000),
    [partnerEmail] NVARCHAR(1000),
    [partnerPhone] NVARCHAR(1000),
    [GPName] NVARCHAR(1000),
    [GPEmail] NVARCHAR(1000),
    [GPPhone] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [Patient_isActive_df] DEFAULT 1,
    [userId] INT NOT NULL,
    [midWifeId] INT NOT NULL,
    CONSTRAINT [Patient_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Patient_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Midwife] ADD CONSTRAINT [Midwife_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_midWifeId_fkey] FOREIGN KEY ([midWifeId]) REFERENCES [dbo].[Midwife]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Address] ADD CONSTRAINT [Address_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
