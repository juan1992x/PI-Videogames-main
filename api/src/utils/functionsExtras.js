const cleanArray = (arr) =>
  arr.map((element) => {
    return {
      id: element.id,
      name: element.name,
      description: element.description,
      plataforms: element.platforms,
      image: element.background_image,
      launchDate: element.released,
      rating: element.ratings,
      created: false,
    };
  });

module.exports = { cleanArray };
