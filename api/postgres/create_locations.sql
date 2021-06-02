CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY,
    userId UUID REFERENCES users(id),
    date TIMESTAMPTZ NOT NULL,
    longitude NUMERIC(18, 15) NOT NULL,
    latitude NUMERIC(18, 15) NOT NULL
);