$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  };

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name"> ${user}</p>
                </div>`
    $("#user-search-result").append(html);
  }

  function appendMember(user) {
    var userName=$(user).data("user-name");
    var userId=$(user).data("user-id");
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${userId}" data-user-name="${userName}">削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  function appendAddUser(user) {
    var userName=$(user).data("user-name");
    var userId=$(user).data("user-id");
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${userName}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${userId}" data-user-name="${userName}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  };

  $(".group-form__input").on("keyup", function() {
    var input = $(".group-form__input").val();

    if (input !== "") {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーが見つかりません");
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    }
    else {
      $("#user-search-result").empty();
    }
  });

  $(document).on("click", ".user-search-add", function() {
    var user = $(this);
    $(this).parent().remove();
    appendMember(user);
  })

  .on("click", ".user-search-remove", function() {
    var user = $(this);
    $(this).parent().remove();
    appendAddUser(user);
  });
});
