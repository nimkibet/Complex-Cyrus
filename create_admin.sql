-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- Insert initial admin user (password is "Cyrus" hashed with sha256)
-- We will use plain text "Cyrus" here for simplicity, and update our Node.js code to support plain text check initially and hash on change.
-- Actually, let's just insert the plain text default password "cyrus" so the code can check it.
INSERT INTO "AdminUser" ("id", "email", "password") VALUES ('admin_1', 'complexcyrus@gmail.com', 'cyrus');
