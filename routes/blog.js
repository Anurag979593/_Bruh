const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
var moment = require("moment");

// GET: display all products
router.get("/", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 4;
  let page = parseInt(req.query.page) || 1;
  try {
     const allblog = await Blog.find()
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await Blog.count();

    res.render("shop/blog", {
      pageName: "Blogs",
      blog:allblog,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/blog/?",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});



module.exports = router;
