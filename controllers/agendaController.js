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
    static async renderLogin(req, res) {//
      res.render('login', { error: null });
    }
      static async renderSecureRoute(req, res) {
          try {
              const user = await db('users').select('username').where('id', req.userId).first();
              res.render('secure', { username: user.username });
          } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
          }
      }
    
    static async renderNovoContato(req, res) {
      res.render('register');
    }
    static async listarContatos(req, res) {//
        try {
            const contatos = await db('contatos').select('*');
            
            if (!contatos || contatos.length === 0) {
                return res.status(404).json({ error: 'No contacts found' });
            }
            
            // Retorna os contatos encontrados
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
                return res.render('listarContatos', { contatos: [] }); // Renderiza a página com uma lista vazia de contatos
            }
            
            // Retorna os contatos encontrados
            res.render('listarContatos', { contatos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }    

    static async renderEditarContato(req, res) {
        try {
            // Aqui você precisará buscar os detalhes do contato que deseja editar
            // Por exemplo, você pode buscar os detalhes do contato com base no ID recebido na requisição
            const { id } = req.params;
            const contato = await db('contatos').where('id', id).first();
    
            if (!contato) {
                return res.status(404).json({ error: 'Contato não encontrado' });
            }
    
            // Renderiza a página editarContato.ejs e passa o objeto contato para o template
            res.render('editarContato', { contato });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
    static async editarContato(req, res) {
        try {
            const { id, nome, idade, relacionamento, email, telefone } = req.body;
    
            // Verifica se todos os campos necessários estão presentes
            if (!id || !nome || !idade || !relacionamento || !email || !telefone) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
    
            // Verifica se o contato existe no banco de dados
            const contatoExistente = await db('contatos').where('id', id).first();
            if (!contatoExistente) {
                return res.status(404).json({ error: 'Contact not found' });
            }
    
            // Atualiza o registro no banco de dados com os novos dados
            await db('contatos').where('id', id).update({
                nome,
                idade,
                relacionamento,
                email,
                telefone
            });
    
            // Retorna uma mensagem de sucesso
            res.status(200).json({ message: 'Contact updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async logout(req, res) {//
      // Rota de logout, limpando o cookie
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    }
  }
  
  module.exports = AgendaController;