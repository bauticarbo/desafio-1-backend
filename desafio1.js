class ProductManager {
  products;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.validateCode(code)) {
      if (title && description && price && thumbnail && code && stock) {
        let product = {
          id: this.products.length + 1,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.products.push(product);
        console.log("Producto agregado!");
      } else {
        console.log("ERROR! Completar todos los campos");
      }
    } else {
      console.log("ERROR! El codigo ya corresponde a un producto.");
    }
  }

  validateCode(cod) {
    let valid = true;
    if (this.products.find((elem) => elem.code == cod)) {
      valid = false;
    }
    return valid;
  }

  getProductById(id) {
    let elem = this.products.find((el) => el.id == id);
    if (elem) {
      console.log(elem);
    } else {
      console.log("Not Found");
    }
  }

  getProducts() {
    return this.products;
  }
}

//PROBANDO EL CODIGO

let productosUno = new ProductManager();

//COMPRUEBO QUE EL ARRAY INICIE VACIO
console.log(productosUno.getProducts());

//CARGO VARIOS PRODUCTOS DE PRUEBA
productosUno.addProduct(
  "PC gamer",
  "pc muy potente ideal para jugar",
  100000,
  "www.pcgamer.com",
  658,
  10
);
productosUno.addProduct(
  "Teclado",
  "teclado estandar uso domestico",
  5000,
  "www.teclado.com",
  689,
  20
);
productosUno.addProduct(
  "Mouse",
  "mouse versatil ideal para oficina",
  3500,
  "www.mouse.com",
  788,
  40
);

//CARGO UN PRODUCTO SIN UNA PROPIEDAD PARA PROBAR LA VALIDACION DE PROPIEDADES

productosUno.addProduct("Mouse", 3500, "www.mouse.com", 788, 40);

//CARGO UN PRODUCTO CON EL CODIGO REPETIDO PARA PROBAR LA VALIDACION DEL CODIGO

productosUno.addProduct(
  "PC domestico",
  "pc muy potente ideal para jugar",
  60000,
  "www.pccasa.com",
  658,
  20
);

//PRUEBO EL METODO GetProducts
console.log(productosUno.getProducts());

//PRUEBO EL METODO GetProductById
productosUno.getProductById(2);
productosUno.getProductById(7);
