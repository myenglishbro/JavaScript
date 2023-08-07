import { Router } from "express";
import ProductManager from "../Dao/Managers/productmanagerMongo.js";
import CartModel from "../Dao/models/cartModel.js";
import productModel from "../Dao/models/productModel.js";

const viewRouter = Router();
const product = new ProductManager();

viewRouter.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  // Realizar lógica de búsqueda
  const filter = {};
  if (query) {
    filter.category = query;
  }

  // Realizar lógica de ordenamiento
  const sortOptions = {};
  if (sort === "asc") {
    sortOptions.precio = 1;
  } else if (sort === "desc") {
    sortOptions.precio = -1;
  }

  try {
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productModel.paginate(
      filter,
      { limit: Number(limit), page: Number(page), sort: sortOptions, lean: true }
    );

    const products = docs;
    res.render("home", {
      products,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Error al obtener los productos" });
  }
});

viewRouter.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await CartModel.findById(cid).populate("products.product");
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    const products = cart.products.map((item) => item.product.toObject());

    res.render("cart", { cart: cart.toObject(), products });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Error al obtener el carrito" });
  }
});

viewRouter.get("/realtimeprod", async (req, res) => {
  const products = await product.getProducts();
  res.render("realtimeprod", { products });
});

viewRouter.post("/products/:pid/add-to-cart", async (req, res) => {
  const pid = req.params.pid;
  const { quantity } = req.body;

  try {
    const product = await productModel.findById(pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Lógica para agregar el producto al carrito
    // ...

    res.json({ status: "Success", message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Error al agregar el producto al carrito" });
  }
});

export default viewRouter;
