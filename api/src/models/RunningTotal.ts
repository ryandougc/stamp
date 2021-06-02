interface totalDistance {
    userId: string,
    totalDistance: Number,
    lastUpdated: Date,
}

export default class RunningTotal implements totalDistance {
    public userId
    public totalDistance
    public lastUpdated

    constructor(
        userId: string,
        totalDistance: Number,
        lastUpdated: Date,
    ) {
        this.userId             = userId
        this.totalDistance      = totalDistance
        this.lastUpdated        = lastUpdated || new Date()
    }

    public update() {
        // Patch the running total
    }
}