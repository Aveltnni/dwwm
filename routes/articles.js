const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// Article model
const Article = require("../models/article");

router.get("/home", function (req, res) {
  if (req.user === undefined) {
    res.redirect("/");
  } else {
    res.render("index", {
      title: "Home",
      
    });
  }
});

router.get("/articles", function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      console.error(err);
    } else {
      if (req.user === undefined) {
        res.redirect("/");
      } else {
        res.render("list", {
          title: "Articles ",
          articles: articles,
        });
      }
    }
  });
});
// mail
router.get("/mail", function (req, res) {
  const data = req.user;
  if (req.user === undefined) {
    res.redirect("/");
  } else {
    res.render("mail", {
      title: "Mail",
      data: data,
    });
  }
});

//send mail

router.post("/mail", function (req, res) {
  req.checkBody("to", "To is required").notEmpty();
  req.checkBody("subject", "subject is required").notEmpty();
  req.checkBody("body", "body is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render("mail", {
      errors: errors,
      data: req.user,
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7deb634e45f784",
      pass: "7e754edc512f9f",
    },
  });

  var mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      req.flash("success", "Your email has been send");
      res.redirect("/articles/mail");
    }
  });
});

// new article form
router.get("/add", function (req, res) {
  const data = req.user;
  if (req.user === undefined) {
    res.redirect("/");
  } else {
    res.render("add_article", {
      title: "Add Article",
      data: data,
    });
  }
});

// submit new article
router.post("/add", function (req, res) {
  // Express validator

  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("author", "Author is required").notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  // Get errors
  let errors = req.validationErrors();

  if (errors) {
    res.render("add_article", {
      title: "Add Article ",
      errors: errors,
      data: req.user,
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function (err) {
      if (err) {
        console.error(err);
        return;
      } else {
        req.flash("success", "Article Added");
        res.redirect("/articles/articles");
      }
    });
  }
});

// load edit form
router.get("/edit/:id", function (req, res) {
  const data = req.user;

  Article.findById(req.params.id, function (err, article,user) {
    if (req.user === undefined) {
      res.redirect("/");
    } else {
      res.render("edit_article", {
        title: "Edit Article",
        article: article,
        data:data,
        
      });
    }
  });
});

// update submit new article
router.post("/edit/:id", function (req, res) {
  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("author", "Author is required").notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  let errors = req.validationErrors();

  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id };

  if (errors) {
    res.render("edit_article", {
        title: "Edit Article",
      errors: errors,
      article: article,
      data:req.user,
      
    });
  } else {
  Article.update(query, article, function (err) {
    if (err) {
      console.error(err);

      return;
    } else {
      req.flash("success", "Article Updated");
      res.redirect("/articles/articles");
    }
  });}
});

// Delete post
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Article.remove(query, function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      req.flash("success", "Article Deleted");
      res.send("Success");
    }
  });
});

// get single article
router.get("/:id", function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if (req.user === undefined) {
      res.redirect("/");
    } else {
      res.render("article", {
        article: article,
      });
    }
  });
});

module.exports = router;
