// Dados iniciais para popular o banco (opcional)
const initialCars = [
    {
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2023,
      cor: "Preto",
      preco: 120000,
      placa: "ABC1234",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      marca: "Honda",
      modelo: "Civic",
      ano: 2022,
      cor: "Branco",
      preco: 115000,
      placa: "DEF5678",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  // Função para popular o banco com dados iniciais
  const populateInitialData = async (carsCollection) => {
    try {
      const snapshot = await carsCollection.get();
      if (snapshot.empty) {
        console.log('Populando banco com dados iniciais...');
        for (const car of initialCars) {
          await carsCollection.add(car);
        }
        console.log('Dados iniciais adicionados com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao popular dados iniciais:', error);
    }
  };
  
  module.exports = { initialCars, populateInitialData };