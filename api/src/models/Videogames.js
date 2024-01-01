const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogames",
    {
     
      origin: {
        type: DataTypes.STRING, // 'API' o 'Database'
        allowNull: true // Puede ser null si decides establecerlo solo para juegos creados en tu base de datos
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      launchDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }

  );
};
