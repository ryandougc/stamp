CREATE TABLE runningTotal (
    userId UUID NOT NULL REFERENCES users(id),
    totalDistance INTEGER NOT NULL DEFAULT '0',
    lastUpdated date NOT NULL DEFAULT CURRENT_TIMESTAMP
);