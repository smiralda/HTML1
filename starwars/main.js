console.log("star wars");

const fetch = require("node-fetch");

class swPerson {
  constructor(name, mass, url) {
    this.name = name;
    this.mass = mass;
    this.url = url;
  }

  static fromJSON(json) {
    const { name, mass: weight, url } = json;
    return new swPerson
  }
}

fetch("https://swapi.co/api/people/").then(response =>
  response.json().then(json => {
    console.log(json.results);
  })
);
