-- DropForeignKey
ALTER TABLE `ApiAccessToken` DROP FOREIGN KEY `ApiAccessToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ApiRefreshToken` DROP FOREIGN KEY `ApiRefreshToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ApiAccessToken` ADD CONSTRAINT `ApiAccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApiRefreshToken` ADD CONSTRAINT `ApiRefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
