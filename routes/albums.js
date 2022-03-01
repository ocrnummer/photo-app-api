const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/example_controller');
const exampleValidationRules = require('../validation/example');

/* Get all resources */
router.get('/', exampleController.index, (req, res) => {

});

/* Get a specific resource */
router.get('/:id', exampleController.show, (req, res) => {
    
});

/* Store a new resource */
router.post('/', exampleValidationRules.createRules, exampleController.store, (req, res) => {

});

/* Update a specific resource */
router.put('/:id', exampleValidationRules.updateRules, exampleController.update, (req, res) => {

});

/* Destroy a specific resource */
router.delete('/:od', exampleController.destroy, (req, res) => {

});

module.exports = router;
