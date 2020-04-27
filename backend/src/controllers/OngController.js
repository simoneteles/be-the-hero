const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        try{
            const ongs = await connection('ongs').select('*');
            return response.json(ongs);
        } catch(e) {
            console.log('error', e);
        }
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    
    try {
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    } catch(e) {
        console.log('error', e);
    }
    
    
    return response.json({ id });
    }
}