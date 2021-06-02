CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    firstName VARCHAR(35),
    lastName VARCHAR(35),
    userName VARCHAR(15) NOT NULL,
    dateOfBirth DATE,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    profilePic VARCHAR(255),
    pword VARCHAR(255) NOT NULL,
    created DATE NOT NULL
);