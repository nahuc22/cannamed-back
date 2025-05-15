const authService = require("../services/authServices")

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await authService.registerUser({ name, email, password});
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear el usuario',
            error: error.message,
        });
    }
};

const loginUser = async ( req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser({ email, password});
        res.status(200).json({
            message: "Login exitoso",
            user
        }) 
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { registerUser , loginUser }