const Provider = require('../models/Provider');

// Crear un proveedor
exports.createProvider = async (req, res) => {
    try {
        const provider = new Provider(req.body);
        await provider.save();
        res.status(201).json(provider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los proveedores
exports.getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json(providers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un proveedor
exports.updateProvider = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(provider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un proveedor
exports.deleteProvider = async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Provider deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
