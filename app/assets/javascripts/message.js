$(function(){
  function buildHTML(message){
    var html = `<p>
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                </p>`
    return html;
  }

  function appendText(message) {
   var html = `<p>
                <div class="message__upper-info__text">
                  <p class="message__upper-info__text__content">
                    ${message.content}
                  </p>
                </div>
              </p>`
   $('.messages').append(html);
  }

  function appendMessage(message) {
   var html = `<p>
                <div class="message__upper-info__text">
                  <p class="message__upper-info__text__content">
                    ${message.content}
                  </p>
                  <img class="lower-message__image" src="${ message.image }">
                </div>
              </p>`
   $('.messages').append(html);
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      if (data.image == null) {
        appendText(data);
      } else {
        appendMessage(data);
      }
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('input[type=reset]', function(){
        $("form")[0].reset();
      });
    })

    .fail(function(){
      alert('error');
    });
  });

  $(function(){
    setInterval(update, 5000);
  });

});
