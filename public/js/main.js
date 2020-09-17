$(document).ready(function () {
  $(".delete-article").on("click", function (e) {
    if (confirm("Do you want to delete this article?") == true) {
      $target = $(e.target);
      const id = $target.attr("data-id");

      $.ajax({
        type: "DELETE",
        url: "/articles/" + id,
        success: function (response) {
          req.flash("success", "Article Deleted");
          window.location.href = "/articles/articles";
        },
        error: function (err) {
          console.error(err);
        },
      });
    } else {
      req.flash("success", "Article Deleted");

      window.location.href = "/articles/articles";
    }
  });
});
