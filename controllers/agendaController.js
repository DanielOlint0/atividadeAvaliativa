const bcrypt = require('bcrypt');///
const jwt = require('jsonwebtoken');//
const knex = require('knex');
const AuthMiddleware = require('../middleware/authMiddleware');//

const knexConfig = require('../knexfile');
const db = knex(knexConfig);

class AgendaController {
    static async novoContato(req, res) {
      const { nome, idade, relacionamento, email, telefone } = req.body;
  
      try {
        //const hashedPassword = await bcrypt.hash(password, 10);
        await db('contatos').insert({ nome, idade, relacionamento, email, telefone });
        res.status(201).json({ message: 'Contato criado com sucesso' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    
    static async renderNovoContato(req, res) {
      res.render('register');
    }
    static async listarContatos(req, res) {
        try {
            const contatos = await db('contatos').select('*');
            
            if (!contatos || contatos.length === 0) {
                return res.status(404).json({ error: 'No contacts found' });
            }
            res.status(200).json({ contatos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async renderListarContatos(req, res) {
        try {
            const contatos = await db('contatos').select('*');
            
            if (!contatos || contatos.length === 0) {
                return res.render('listarContatos', { contatos: [] });
           }
            
            res.render('listarContatos', { contatos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }    
    
    static async excluirContato(req, res) {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ error: 'Invalid ID' });
            }
    
            await db('contatos').where('id', id).del();
            res.status(200).json({ message: 'Contato excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    static async renderEditarContato(req, res) {
        try {
            const { id } = req.params;
            const contato = await db('contatos').where('id', id).first();

            if (!contato) {
                return res.status(404).json({ error: 'Contato não encontrado' });
            }

            res.render('editar', { contato });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async editarContato(req, res) {
        try {
            const { id } = req.params;
            const { nome, idade, relacionamento, email, telefone } = req.body;

            await db('contatos').where('id', id).update({ nome, idade, relacionamento, email, telefone });

            res.status(200).json({ message: 'Contato atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
  
  module.exports = AgendaController;