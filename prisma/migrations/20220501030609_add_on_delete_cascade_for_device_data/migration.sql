-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeviceData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "info" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" INTEGER NOT NULL,
    CONSTRAINT "DeviceData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DeviceData" ("createdAt", "deviceId", "id", "info") SELECT "createdAt", "deviceId", "id", "info" FROM "DeviceData";
DROP TABLE "DeviceData";
ALTER TABLE "new_DeviceData" RENAME TO "DeviceData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
