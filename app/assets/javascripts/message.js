$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-chat__message-list__message">
          <div class="main-chat__message-list__message__message-data">
            <p class="main-chat__message-list__message__message-data__username">
              ${message.user_name}
            </p>
            <p class="main-chat__message-list__message__message-data__date">
              ${message.created_at}
            </p>
          </div>
          <p class="main-chat__message-list__message__text">
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="main-chat__message-list__message">
        <div class="main-chat__message-list__message__message-data">
          <p class="main-chat__message-list__message__message-data__username">
            ${message.user_name}
          </p>
          <p class="main-chat__message-list__message__message-data__date">
            ${message.created_at}
          </p>
        </div>
        <p class="main-chat__message-list__message__text">
          ${message.content}
        </p>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST', 
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('#new_message')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.main-chat__message-form__input-box__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.main-chat__message-form__input-box__submit-btn').prop('disabled', false);
    });
  })
});