-- AlterTable
ALTER TABLE `ApiAccessToken` MODIFY `expiracy` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ApiRefreshToken` MODIFY `expiracy` DATETIME(3) NULL;
