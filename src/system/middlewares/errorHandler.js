const errorHandler = (error, req, res, next) => {
    console.log(error)
    if (error.name === 'ErrorNotFound') {
        res.status(404).json({message: 'Error not found'})
    } else {
        res.status(500).json({message: 'Internal server error'})
    }
}

export default errorHandler