const connection = require('../database/connection');

// Function that we'll use to validate the data of an equipment before inserting or updating it in the database
// I recommend that you read it only after reading the create function and the update function
function validateData (newEquipment) {
    let error = false;
    let errorMsg = '';

    if (typeof(newEquipment.model) !== 'string' || newEquipment.model === '') {
        error = true;
        errorMsg = 'The equipment model needs to be filled in';
    } else if (newEquipment.category != 'cartucho' && newEquipment.category != 'toner') {
        error = true;
        errorMsg = 'The available values for the equipment category are only "cartucho" and "toner"';
    } else if (typeof(newEquipment.ppm) === 'string' || (typeof(newEquipment.ppm) == 'number' && newEquipment.ppm <= 0)) {
        // If the ppm attribute is a string or is a number smaller than zero, we're going to give the message below to the user
        error = true;
        errorMsg = `The available values for the PPM attribute are only numbers greater than zero, or null(you should only put null if the ppm
            attribute does not apply for the equipment that you want to register)
        `;
    } else if (newEquipment.wifi !== true && newEquipment.wifi !== false && newEquipment.wifi !== null) {
        error = true;
        errorMsg = `The available values for the wifi attribute are only true, false or null(you should only put null if the wifi attribute
            does not apply for the equipment that you want to register) 
        `;
    } else if(typeof(newEquipment.consumption) === 'string' || (typeof(newEquipment.consumption) === 'number' && newEquipment.consumption <= 0)) {
        error = true;
        errorMsg = `The available values for the consumption attribute are only numbers greater than zero, or null(you should only put null if the consumption
            attribute does not apply for the equipment that you want to register)
        `;
    }

    return {
        error,
        errorMsg
    }
}

// Function that we will use to check if there is any equipment in the database with the ID sent to this function
async function checkIfExists (equipmentId) {
    let exists = undefined;

    const equipment = await connection('equipments')
        .where({ id: equipmentId })
        .select('*');
       
    // If the equipment doesn't exist in the database, the variable above will get an empty array
    // and an empty array can be converted to false as in the if statement below
    if (equipment == false) {
        exists = false;
    } else {
        exists = true;
    }

    return exists;
}

module.exports = {
    async index (request, response) {
        const equipments = await connection('equipments').select('*');

        return response.status(200).json(equipments);
    },

    async showOne (request, response) {
        const id = request.params.id;

        const equipment = await connection('equipments')
            .where({ id: id })
            .select('*');
        
        const exists = await checkIfExists(id);

        if (!exists) {
            return response.status(404).send('Equipment not found');
        }
    
        return response.status(200).json(equipment);
    },

    async create (request, response) {
        const { model, category, ppm, wifi, consumption } = request.body;

        let newEquipment = {
            model,
            category,
            ppm: ppm || null,
            wifi,
            consumption: consumption || null
        }

        let validation = validateData(newEquipment);

        if (validation.error) {
            return response.status(400).send(validation.errorMsg);
        }

        // We're inserting the new equipment into the table equipments and receveing an array
        // with the PK value of the new equipment in the index 0
        let newEquipmentID = await connection('equipments').insert(newEquipment);

        // Selecting the created equipment to show it to the user
        const createdEquipment = await connection('equipments')
            .where({ id: newEquipmentID[0] })
            .select('*');


        return response.status(201).json(createdEquipment);
    },

    async update (request, response) {
        const { id } = request.params;

        const exists = await checkIfExists(id);

        if (!exists) {
            return response.status(404).send('Equipment not found');
        }
        
        let { model, category, ppm, wifi, consumption } = request.body;

        let equipmentToEdit = {
            id,
            model,
            category,
            ppm,
            wifi,
            consumption
        };

        // It gets an array with the equipment in the index zero
        const equipment = await connection('equipments')
            .where({ id: id })
            .select('*');

        const keys = Object.keys(equipment[0]);

        for (key of keys) {
            if (equipmentToEdit[key] === undefined) {
                
                // We're doing it because the database saves the booleans as 0 or 1(unless it's equal to null), so we need to convert it
                // to true or false again, otherwise we'll not be able to update it in the database!
                if (key === 'wifi' && equipment[0][key] !== null) {
                    equipmentToEdit[key] = !(!equipment[0][key]);
                } else {
                    equipmentToEdit[key] = equipment[0][key];
                }

            }
        }

        const validation = validateData(equipmentToEdit);

        if (validation.error) {
            return response.status(400).send(validation.errorMsg);
        }
        
        await connection('equipments')
            .update(equipmentToEdit)
            .where({ id: id });

        return response.json(equipmentToEdit);
    },

    async delete (request, response) {
        const { id } = request.params;

        const exists = await checkIfExists(id);

        if (!exists) {
            return response.status(404).send('Equipment not found');
        }

        await connection('equipments')
            .where({ id: id })
            .delete();
        
        return response.status(204).send('Equipment has been deleted');
    }
}