const express = require("express");
const ctrl = require("../controllers/participant");
const { validateBody, validateParams } = require("../middleware");

// const { validateBody, validateQuery } = require("../../middlewares");
const schemas = require("../schemas/participant");

const router = express.Router();

router.get("/:event", validateParams(schemas.objectIdSchema), ctrl.getByEvent);

router.post(
  "/:event",
  validateParams(schemas.objectIdSchema),
  validateBody(schemas.addParticipantSchema),
  ctrl.add
);

module.exports = router;
