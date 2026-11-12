-- Default currency is US dollars. Existing rows keep the currency they were created with.
ALTER TABLE "trips" ALTER COLUMN "currency" SET DEFAULT 'USD';
ALTER TABLE "expenses" ALTER COLUMN "currency" SET DEFAULT 'USD';
