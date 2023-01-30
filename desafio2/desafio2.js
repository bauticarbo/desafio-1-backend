const fs = require("fs");
class ProductManager {
  constructor(file) {
    this.file = file;
  }
  async incrementableId() {
    let idMax = 0;
    const dataParse = await this.getProducts();
    dataParse.forEach((product) => {
      if (product.id > idMax) {
        idMax = product.id;
      }
    });
    return idMax + 1;
  }
  async addProduct(product) {
    try {
      const dataParse = await this.getProducts();
      dataParse.push({ ...product, id: await this.incrementableId() });
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(dataParse, null, 2)
      );
    } catch {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify([{ ...product, id: 1 }])
      );
    }
  }
  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      throw new Error(err);
    }
  }
  async getProductById(id) {
    try {
      const dataParse = await this.getProducts();
      return dataParse.find((item) => item.id === id) || null;
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateProduct(id, product) {
    try {
      const dataParse = await this.getProducts();
      const position = dataParse.findIndex((productId) => productId.id === id);
      console.log(position);
      product.id = id;
      dataParse.splice(position, 1, product);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(dataParse, null, 2)
      );
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteById(id) {
    try {
      const dataParse = await this.getProducts();
      const filterData =
        dataParse.filter((product) => product.id !== id) || null;
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(filterData, null, 2)
      );
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, "[]");
    } catch (err) {
      throw new Error(err);
    }
  }
}
const product1 = {
  title: "PC Gamer",
  description: "pc muy potente ideal para jugar",
  price: 100000,
  thumbnail: "www.pcgamer.com",
  code: 658,
  stock: 10,
};
const product2 = {
  title: "Teclado",
  description: "Teclado estandar para uso domestico",
  price: 5000,
  thumbnail: "www.teclado.com",
  code: 689,
  stock: 20,
};
const product3 = {
  title: "Mouse",
  description: "mouse versatil ideal para oficina",
  price: 3500,
  thumbnail: "www.mouse.com",
  code: 788,
  stock: 40,
};
const productRemplazo = {
  title: "Teclado Gamer",
  description: "Teclado mecanico gamer ideal para jugar juegos",
  price: 9000,
  thumbnail: "www.tecladogamer.com",
  code: 589,
  stock: 15,
};
const run = async () => {
  try {
    const products = new ProductManager("products.json");
    await products.addProduct(product1);
    await products.addProduct(product2);
    await products.addProduct(product3);

    console.log("Probando el metodo getProducts", await products.getProducts());
    console.log(
      "Probando el metodo getProductsbyId",
      await products.getProductById(2)
    );
    await products.updateProduct(2, productRemplazo);
    console.log(
      "Comprobando que se haya reemplazado el producto",
      await products.getProducts()
    );
    console.log(
      "Probando el metodo getProductsbyId",
      await products.getProductById(2)
    );
    // await products.deleteById(2)
    // await products.deleteAll()
  } catch {
    console.log("Hubo un problema con la solicitud que realizo");
  }
};
run();
