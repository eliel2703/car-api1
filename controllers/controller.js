const { carsCollection } = require('../config/firebase');

const criarCarro = async (req, res) => {
  try {
    const { marca, modelo, ano, cor, preco, placa } = req.body;
    
    if (!marca || !modelo || !ano || !placa) {
      return res.status(400).json({ 
        error: 'Marca, modelo, ano e placa são obrigatórios' 
      });
    }

    const carData = {
      marca,
      modelo,
      ano: Number(ano),
      cor: cor || '',
      preco: preco ? Number(preco) : 0,
      placa: placa.toUpperCase(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await carsCollection.add(carData);
    
    res.status(201).json({
      id: docRef.id,
      message: 'Carro criado com sucesso',
      data: carData
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar carro: ' + error.message });
  }
};

const buscarAllCarros = async (req, res) => {
  try {
    const snapshot = await carsCollection.get();
    const cars = [];
    
    snapshot.forEach(doc => {
      cars.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carros: ' + error.message });
  }
};

const atualizarCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, ano, cor, preco, placa } = req.body;
    
    const doc = await carsCollection.doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    const updateData = {
      updatedAt: new Date()
    };

    if (marca) updateData.marca = marca;
    if (modelo) updateData.modelo = modelo;
    if (ano) updateData.ano = Number(ano);
    if (cor !== undefined) updateData.cor = cor;
    if (preco !== undefined) updateData.preco = Number(preco);
    if (placa) updateData.placa = placa.toUpperCase();

    await carsCollection.doc(id).update(updateData);

    res.json({
      message: 'Carro atualizado com sucesso',
      id: id
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar carro: ' + error.message });
  }
};

const deletarCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await carsCollection.doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    await carsCollection.doc(id).delete();
    
    res.json({ message: 'Carro deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar carro: ' + error.message });
  }
};

module.exports = {
  criarCarro,
  buscarAllCarros,
  atualizarCarro,
  deletarCarro
};