const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'ErrorNotFound') {
        res.status(404).json({message: 'Error not found'})
    } else if (error.name === 'ValidationError') {
        res.status(400).json({message: 'Error validation'})
    } else if (error.name === 'InvalidCredentials') {
        res.status(400).json({message: 'Invalid credentials'})
    } else if (error.name === 'InvalidPassword') {
        res.status(400).json({message: 'Password min length 8'})
    } else if (error.name === 'RegistrationFailed') {
        res.status(400).json({message: 'Registration failed'})
    } else if (error.name === 'UsernameAlreadyExist') {
        res.status(400).json({message: 'Username already exist'})
    } else if (error.name === 'WrongUsernameOrPassword') {
        res.status(400).json({message: 'Wrong username or password'})
    } else if (error.name === 'LoginFailed') {
        res.status(400).json({message: 'Login failed'})
    } else if (error.name === 'CreateFailed') {
        res.status(400).json({message: 'Create failed'})
    } else if (error.name === 'DataAlreadyExist') {
        res.status(400).json({message: 'Data already exist'})
    } else {
        res.status(500).json({message: 'Internal server error'})
    }
}

export default errorHandler
