-- CreateTable
CREATE TABLE "gusers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "change_password" BOOLEAN DEFAULT true,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    "expenseId" TEXT,

    CONSTRAINT "gusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gsessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gsessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gusers_login_key" ON "gusers"("login");

-- CreateIndex
CREATE UNIQUE INDEX "gsessions_sessionToken_key" ON "gsessions"("sessionToken");

-- AddForeignKey
ALTER TABLE "gsessions" ADD CONSTRAINT "gsessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "gusers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
