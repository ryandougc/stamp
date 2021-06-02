import * as uuid            from 'uuid'

interface Account {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    profilePic: string,
    created: Date
}

export default class User implements Account {
    public id: string // Required
    public firstName: string
    public lastName: string
    public username: string // Required
    public dateOfBirth: Date
    public email: string // Required
    public phone: string
    public profilePic: string
    private pWord: string // Required
    public created: Date // Required

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        username: string,
        dateOfBirth: Date,
        email: string,
        phone: string,
        profilePic: string,
        password: string,
        created: Date,
    ) {
        this.id             = id || uuid.v4()
        this.firstName      = firstName
        this.lastName       = lastName
        this.username       = username
        this.dateOfBirth    = dateOfBirth
        this.email          = email
        this.phone          = phone
        this.profilePic     = profilePic
        this.pWord          = password
        this.created        = created || new Date()
    }

    public save(pool: any) {
        return pool.query({
            text: `
                INSERT INTO users (
                    id,
                    firstName,
                    lastName,
                    username,
                    dateofbirth,
                    email,
                    phone,
                    profilepic,
                    pword,
                    created
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                );
            `,
            values: [
                this.id,
                this.firstName,
                this.lastName,
                this.username,
                this.dateOfBirth,
                this.email,
                this.phone,
                this.profilePic,
                this.pWord,
                this.created
            ]
        })
    }

    public updatePassword(pool: any) {
        return pool.query({
            text: `
                UPDATE users 
                SET pword = $1
                WHERE id = $2;
            `,
            values: [
                this.pWord,
                this.id
            ]
        })
    }

    public updateUsername(pool: any) {
        return pool.query({
            text: `
                UPDATE users 
                SET username = $1
                WHERE id = $2;
            `,
            values: [
                this.username,
                this.id
            ]
        })
    }

    public updateEmail(pool: any) {
        return pool.query({
            text: `
                UPDATE users 
                SET email = $1
                WHERE id = $2;
            `,
            values: [
                this.email,
                this.id
            ]
        })
    }

    public delete() {
        // Delete the user
    }

    public static checkPwordsMatch(pWord: string, pWordMatch: string): boolean {
        if (pWord !== pWordMatch) {
            const match_Error = new Error("Passwords don't match")
            match_Error.status = 400
    
            throw match_Error
        }

        return true
    }
}