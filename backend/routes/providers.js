const express = require('express');
const { createProvider, getProviders, updateProvider, deleteProvider } = require('../controllers/providerController');
const router = express.Router();

router.post('/', createProvider);
router.get('/', getProviders);
router.put('/:id', updateProvider);
router.delete('/:id', deleteProvider);

module.exports = router;
