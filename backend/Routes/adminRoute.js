const { get, post, put, delete1 } = require("../controllers/AdminController");
const { Router } = require("express");
//requiring and setting up multer
const multiparty= require("connect-multiparty")
const multimiddleware=multiparty()
// const upload = require('../utils/multer')
const upload = require("../utils/multer")
const router = Router();
router.post("/admin/login", post.login_admin);
router.post("/admin/addMovie",upload.array("posterImage",2), post.add_movie);
// router.patch("/admin/editProducts/:productId",patch.edit_product)
// router.delete("/admin/deleteProduct/:productId",patch.delete_product)
router.delete("/admin/logout/:adminToken", delete1.logout_admin);
module.exports = router;
