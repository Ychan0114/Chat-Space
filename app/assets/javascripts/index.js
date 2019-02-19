$(function() {
  $(".group-form__input").on("keyup", function() {
    var input = $(".group-form__input").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    });

    .done(function(users) {
    })
  });
});
