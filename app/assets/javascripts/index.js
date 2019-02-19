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
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoProduct("一致するユーザーが見つかりません");
      }
    });
  });
});
