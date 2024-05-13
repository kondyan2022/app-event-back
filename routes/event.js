const express = require("express");
const ctrl = require("../controllers/event");
const schemas = require("../schemas/event");
const { validateQuery } = require("../middleware");

const router = express.Router();

router.get("/", validateQuery(schemas.queryEventSchema), ctrl.getAll);

module.exports = router;
