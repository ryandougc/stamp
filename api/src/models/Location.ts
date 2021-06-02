import * as uuid            from 'uuid'

interface Location {
    id: string,
    userId: string,
    date: Date,
    longitude: Number,
    latitude: Number
}

export default class Coordinates implements Location {
    public id
    public userId
    public date
    public longitude
    public latitude

    constructor(
        id: string,
        userId: string,
        date: Date,
        longitude: Number,
        latitude: Number
    ) {
        this.id             = id || uuid.v4()
        this.userId         = userId
        this.date           = date || new Date()
        this.longitude      = longitude
        this.latitude       = latitude
    }

    public save(pool: any) {
        return pool.query({
            text: `
                INSERT INTO locations (
                    id,
                    userId,
                    date,
                    longitude,
                    latitude
                ) VALUES (
                    $1, $2, $3, $4, $5
                );
            `,
            values: [
                this.id,
                this.userId,
                this.date,
                this.longitude,
                this.latitude
            ]
        })
    }
}