import * as bcrypt                  from 'bcrypt'
import * as jwt                     from 'jsonwebtoken'

import postgresDbFactory            from '../mixins/pg_connect'
import dbPool                       from '../mixins/setupDb'

import User                         from '../models/User'
import Location                     from '../models/Location'
// import RunningTotal                 from '../models/RunningTotal'

export const signin_user = async (req, res, next) => {
    try {
        const db = dbPool()

        const results = await db.getUserByUsername(req.body.username)

        const userDetails = results.rows[0]

        const pwordAuth = await bcrypt.compare(req.body.password, userDetails.pword)

        if(!pwordAuth) {
            const auth_Error = new Error('Unable to log you in')
            auth_Error.status = 400
    
            return next(auth_Error)
        }

        const token = jwt.sign(
            {
                email: userDetails.email,
                userId: userDetails.id,
                created: userDetails.created
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            success: {
                message: "Auth Successful",
                token: token
            }
        })
    }
    catch(err) {
        console.log(err)

        const login_Error = new Error('Internal server error')
        login_Error.status = 500

        return next(login_Error)
    }
}

export const get_users = async (req, res, next) => {
    const db = dbPool()

    try {
        const results = await db.getAll('users')

        if(results.rowCount === 0) {
            return res.status(200).json({
                success: {
                    message: "No users found"
                }
            })
        }

        res.status(200).json({
            success: {
                message: "Found users",
                users: results.rows
            }
        })
    } 
    catch(err) {
        console.log(err)

        const error = new Error('Could not find users')
        error.status = 501
        
        return next(error)
    }
}

export const post_user = async (req, res, next) => {
    // Make sure all data is present
    if(req.body.password === undefined ||
        req.body.username === undefined ||
        req.body.email === undefined ||
        req.body.passwordMatch === undefined) 
    {
        const dataMissing_Error = new Error('Missing required information')
        dataMissing_Error.status = 400

        return next(dataMissing_Error)
    }

    // Hash Passwords

    // Match passwords
    if(req.body.password !== req.body.passwordMatch) {
        const match_Error = new Error("Passwords don't match")
        match_Error.status = 400

        return next(match_Error)
    }

    // Check if email is already in use
    try {
        const db = dbPool()

        const emailExists = await db.checkEmailExists(req.body.email)

        if(emailExists) {
            const emailExists_Error = new Error("Email already taken")
            emailExists_Error.status = 409

            return next(emailExists_Error)
        }
    }
    catch(err) {
        console.log(err)

        const checkEmail_Error = new Error('Internal server error')
        checkEmail_Error.status = 500
        
        return next(checkEmail_Error)
    }

    // Create and save user to database
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const hashedPasswordMatch = await bcrypt.hash(req.body.passwordMatch, 10)

        bcrypt.hash(hashedPassword, 10, (err, hash) => {
            if(err) {
                const hash_Error = new Error("Internal server error while hashing password")
                hash_Error.status = 500
        
                return hash_Error
            } else {
                return hash
            }
        })

        const newUser = new User(
            null, // Create a userid for us
            null, // req.body.firstName, -> not currently using this
            null, // req.body.lastName, -> not currently using this
            req.body.username,
            null, // req.body.dateOfBirth, -> not currently using this
            req.body.email,
            null, // req.body.phone, -> not currently using this
            null, // req.body.profilePic, -> not currently using this
            hashedPassword,
            null // Create current timestamp for the date the user was created
        )

        await newUser.save(postgresDbFactory)

        // // Create running total for user
        // const rT = new RunningTotal(newUser.id, 0, newUser.created)

        // await rT.save(postgresDb)

        res.status(201).json({
            message: "User created"
        })
    }
    catch(err) {
        console.log(err)

        const postUser_Error = new Error('Internal server Error')
        postUser_Error.status = 500

        return next(postUser_Error)
    }
}

export const get_user = async (req, res, next) => {
    const db = dbPool()

    try {
        const results = await db.getById(req.params.id, 'users')

        if(results.rowCount === 0) {
            const noUser_Error = new Error('User not found')
            noUser_Error.status = 404
    
            return next(noUser_Error)
        }

        res.status(200).json({
            success: {
                message: "User found",
                user: results.rows
            }
        })
    }
    catch(err) {
        console.log(err)

        const getUser_Error = new Error('Internal server Error')
        getUser_Error.status = 500

        return next(getUser_Error)
    }
}

export const patch_user = async (req, res, next) => {
    const properties = req.body.update // Object, key is the user's property to change, value is the new value
    let user_old
    let update = {
        username: false,
        email: false,
        password: false
    }

    // Check if any properties are even set
    if(!properties) {
        const userPatch_Error = new Error('No values provided for update')
        userPatch_Error.status = 403

        return next(userPatch_Error)
    }

    // Only allow certain properties to be used (can't change created date)
    for(const prop in properties) {
        if(prop === "firstName"
            || prop === "latName"
            || prop === "username"
            || prop === "dateOfBirth"
            || prop === "email"
            || prop === "phone"
            || prop === "password"
            || prop === "passwordMatch"
            || prop === "currentPassword") {
                
            continue
        }

        const userPatch_Error = new Error('Forbidden')
        userPatch_Error.status = 403

        return next(userPatch_Error)
    }

    // Get the user's current data
    try {
        const results = await dbPool().getById(req.params.id, 'users')

        if(results.rowCount === 0) {
            const noUser_Error = new Error('User not found')
            noUser_Error.status = 404
    
            return next(noUser_Error)
        }

        user_old = new User(
            results.rows[0].id,
            results.rows[0].firstname,
            results.rows[0].lastname,
            results.rows[0].username,
            results.rows[0].dateofbirth,
            results.rows[0].email,
            results.rows[0].phone,
            results.rows[0].profilePic,
            results.rows[0].pword,
            results.rows[0].created
        )
    }
    catch(err) {
        console.log(err)

        const getUser_Error = new Error('Internal server Error')
        getUser_Error.status = 500

        return next(getUser_Error)
    }

    // Change password
    if(properties.password) {
        // Verify current password
        if(properties.currentPassword !== user_old.pWord) {
            const pword_Error = new Error("Incorrect password")
            pword_Error.status = 400
    
            return next(pword_Error)
        }
        
        // Make sure new password fields match
        if(req.body.update.password !== req.body.update.passwordMatch) {
            const pwordMatch_Error = new Error("Passwords don't match")
            pwordMatch_Error.status = 400
    
            return next(pwordMatch_Error)
        }else {
            delete properties.passwordMatch
        }

        // Verify current password and new password aren't the same
        if(properties.password === user_old.pWord) {
            const existingPword_Error = new Error("New password cannot be the same as previous password")
            existingPword_Error.status = 400
    
            return next(existingPword_Error)
        }

        user_old.pWord = properties.password
        update.password = true
    }

    // Change email
    if(properties.email) {
        // Make sure the new email isn't the same as any other email in the system
        try {
            const emailExists = await dbPool().checkEmailExists(properties.email, 'users')

            if(emailExists) {
                const emailExists_Error = new Error("Email already in use")
                emailExists_Error.status = 409

                return next(emailExists_Error)
            }
        }
        catch(err) {
            console.log(err)

            const checkEmail_Error = new Error('Internal server Error')
            checkEmail_Error.status = 500
            
            return next(checkEmail_Error)
        }

        user_old.email = properties.email
        update.email = true
    }

    // Change username
    if(properties.username) {
        // Make sure the username isn't the same as any other usernames in the system
        try {
            const usernameExists = await dbPool().checkUsernameExists(properties.username, 'users')

            if(usernameExists) {
                const usernameExists_Error = new Error("Username already in use")
                usernameExists_Error.status = 409

                return next(usernameExists_Error)
            }
        }
        catch(err) {
            console.log(err)

            const checkUsername_Error = new Error('Internal server Error')
            checkUsername_Error.status = 500
            
            return next(checkUsername_Error)
        }

        user_old.username = properties.username
        update.username = true
    }

    // Update values
    const postgresDb = postgresDbFactory()

    if(update.username) {
        try { 
            await user_old.updateUsername(postgresDb)
        }
        catch(err) {
            console.log(err)

            const updateUsername_Error = new Error('Internal server Error')
            updateUsername_Error.status = 500
            
            return next(updateUsername_Error)
        }
    }

    if(update.password) {
        try { 
            await user_old.updatePassword(postgresDb)
        }
        catch(err) {
            console.log(err)

            const updatePassword_Error = new Error('Internal server Error')
            updatePassword_Error.status = 500
            
            return next(updatePassword_Error)
        } 
    }

    if(update.email) {
        try { 
            await user_old.updateEmail(postgresDb)
        }
        catch(err) {
            console.log(err)

            const updateEmail_Error = new Error('Internal server Error')
            updateEmail_Error.status = 500
            
            return next(updateEmail_Error)
        } 
    }
    
    res.status(200).json({
        success: {
            message: "User Updated"
        }
    })
}

export const delete_user = async (req, res, next) => {
    const db = dbPool()

    try {
        const deleted_user = await db.deleteById(req.params.id, 'users')

        if(deleted_user.rowCount === 0){ 
            const noUser_Error = new Error('User not found')
            noUser_Error.status = 404
            
            return next(noUser_Error)
        }

        res.status(200).json({
            success: {
                message: "User Deleted"
            }
        })
    } 
    catch(err) {
        console.log(err)

        const error = new Error('Could not delete user')
        error.status = 501
        
        return next(error)
    }
}

export const get_user_locations = async (req, res, next) => {
    const db = dbPool()

    try {
        const results = await db.getById(req.params.id, 'locations', 'userId')

        if(results.rowCount === 0) {
            const noUserLocations_Error = new Error('No locations found for this user')
            noUserLocations_Error.status = 404
    
            return next(noUserLocations_Error)
        }

        // Remove trailing 0s from number
        results.rows.forEach(coord => {
            coord.latitude = coord.latitude.replace(/0*$/, "")
            coord.longitude = coord.longitude.replace(/0*$/, "")
        })

        res.status(200).json({
            success: {
                message: "Found user's locations",
                locations: results.rows
            }
        })
    }
    catch(err) {
        console.log(err)

        const getUserLocation_Error = new Error('Internal server Error')
        getUserLocation_Error.status = 500

        return next(getUserLocation_Error)
    }
}

export const post_user_location = async (req, res, next) => {
    // Make sure all data is present
    if(req.params.id === undefined ||
        req.body.longitude === undefined ||
        req.body.latitude === undefined)
    {
        const dataMissing_Error = new Error('Missing required information')
        dataMissing_Error.status = 400

        return next(dataMissing_Error)
    }

    // Create and save user to database
    try {
        const newLocation = new Location(
            null,
            req.params.id,
            null,
            req.body.longitude,
            req.body.latitude
        )

        const postgresDb = postgresDbFactory()

        await newLocation.save(postgresDb)

        res.status(201).json({
            message: "Location saved"
        })
    }
    catch(err) {
        console.log(err)

        const postUser_Error = new Error('Internal server Error')
        postUser_Error.status = 500

        return next(postUser_Error)
    }
}

export const delete_user_location = async (req, res, next) => {
    const db = dbPool()

    try {
        const deleted_user_location = await db.deleteById(req.params.locationId, 'locations')

        if(deleted_user_location.rowCount === 0){ 
            const noUserLocation_Error = new Error('Location not found')
            noUserLocation_Error.status = 404
            
            return next(noUserLocation_Error)
        }

        res.status(200).json({
            success: {
                message: "Location Deleted"
            }
        })
    } 
    catch(err) {
        console.log(err)

        const error = new Error('Could not delete location')
        error.status = 501
        
        return next(error)
    }
}

export const get_user_runningTotal = async (req, res, next) => {

}

export const post_user_runningTotal = async (req, res, next) => {

}

export const patch_user_runningTotal = async (req, res, next) => {

}

export const delete_user_runningTotal = async (req, res, next) => {

}