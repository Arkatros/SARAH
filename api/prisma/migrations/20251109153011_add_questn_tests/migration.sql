BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TestQuestion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [description] NVARCHAR(1000) NOT NULL,
    [test] NVARCHAR(1000) NOT NULL,
    [number] INT NOT NULL,
    [subquestionNumber] INT,
    [parentId] INT,
    CONSTRAINT [TestQuestion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Response] (
    [id] INT NOT NULL IDENTITY(1,1),
    [description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Response_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[QuestionResponse] (
    [questionId] INT NOT NULL,
    [responseId] INT NOT NULL,
    [value] INT NOT NULL,
    CONSTRAINT [QuestionResponse_pkey] PRIMARY KEY CLUSTERED ([questionId],[responseId])
);

-- AddForeignKey
ALTER TABLE [dbo].[TestQuestion] ADD CONSTRAINT [TestQuestion_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[TestQuestion]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[QuestionResponse] ADD CONSTRAINT [QuestionResponse_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[TestQuestion]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[QuestionResponse] ADD CONSTRAINT [QuestionResponse_responseId_fkey] FOREIGN KEY ([responseId]) REFERENCES [dbo].[Response]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
