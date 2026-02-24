import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()

app.use(express.json())
app.use(cors())

// Conexão com o banco de dados do professor
const db = await mysql.createConnection({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos',
  database: 'web_03mc'
})

await db.query(`
  CREATE TABLE IF NOT EXISTS produtos_luiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT
  )
`)

app.post('/products', async (req, res) => {
  const { name, price, category, description } = req.body
  const query = 'INSERT INTO produtos_luiz (name, price, category, description) VALUES (?, ?, ?, ?)'
  
  await db.query(query, [name, price, category, description])
  
  return res.status(201).json({ message: "Produto cadastrado com sucesso" })
})

app.get('/products', async (req, res) => {
  const query = 'SELECT * FROM produtos_luiz'
  const [rows] = await db.query(query)
  
  return res.status(200).json(rows)
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const query = 'DELETE FROM produtos_luiz WHERE id = ?'
  
  await db.query(query, [id])
  
  return res.status(200).json({ message: "Produto apagado com sucesso" })
})

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333")
})