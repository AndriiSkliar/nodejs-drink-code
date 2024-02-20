const express = require("express");
const jsonParser = express.json();

const ctrl = require("../../controllers/drinks/getById");
const getHomePageDrinks = require("../../controllers/drinks/getHomePageDrinks");

const addDrink = require("../../controllers/drinks/addDrink");
const ctrlAll = require("../../controllers/drinks/getAllDrinks");
const filter = require("../../controllers/filters/filters");

const { isValidId, authenticate } = require("../../middlewares");

// const { schemas } = require("../../models/drink");

const router = express.Router();

// GET/mainpage Отримання коктейлів для головної сторінки
router.get("/mainpage", authenticate, getHomePageDrinks);

// GET/popular Отримання популярних  коктейлів

// GET/search Отримання коктейлів по категорії + інгредієнту + ключовому слову
router.get("/", authenticate, ctrlAll.getAllDrinks);
router.get("/search", authenticate, filter.getDrinks);
router.get("/search/category", authenticate, filter.getDrinksByCategory);
router.get("/search/ingredients", authenticate, filter.getDrinksByIngredient);

// GET/:id Отримання одного коктейлю за ID
router.get("/:id", authenticate, isValidId, ctrl.getById);

// POST/own/ add Додавання власного коктейлю
router.post("/own", jsonParser, addDrink);

// DELETE/own/remove Видалення власного коктейлю
// GET/own Отримання власних коктейлів
// POST/favorite/add/ Додавання коктейлю до обраних
// DELETE/favorite/remove/ Видалення коктейлю з обраних
// GET/favorite Отримання коктейлів з обраних

module.exports = router;
