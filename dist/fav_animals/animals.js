$(document).ready(function () {
  $(".getFavAnimal").on("click", function () {
    $.ajax({
      url: `/favorites/animals`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (response) {
        console.log("sucess!");
      },
      error: function (res, status, error) {
        alert(res.responseText);
        location.href = "/";
      },
    });
  });
});
