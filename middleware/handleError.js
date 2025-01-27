//Gestore di errori del server
const handleError = (err, req, res, next) => {
    req.statusCode = 500;
    res.json({
        error: true,
        message: "Errore interno del server"
    })
}

export default handleError