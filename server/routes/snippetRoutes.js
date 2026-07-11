const express = require('express')
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createSnippet,
  getSnippets,
  updateSnippet,
  deleteSnippet
} = require("../controllers/snippetController");

const app = express();

router.use(verifyToken); 

router.post("/", createSnippet);
router.get("/", getSnippets);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

module.exports = router;