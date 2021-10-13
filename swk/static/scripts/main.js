$(function(){
    var csrftoken = getCookie('csrftoken');
  
    $.ajaxSetup({
                    beforeSend: function(xhr, settings) {
                        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                            // Send the token to same-origin, relative URLs only.
                            // Send the token only if the method warrants CSRF protection
                            // Using the CSRFToken value acquired earlier
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    }
    });
  
  function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
  }
  
  // usando jQuery
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  
  
    function csrfSafeMethod(method) {
        // estos métodos no requieren CSRF
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
  });
  
  var $wet_afField = $('.ajax_change')
  $wet_afField .change(function(){
      var $field1 = {'drywaste_bf':$(this).val()}
      var $field2 = {'drywaste_af':$(this).val()}
      var $field3 = {'wetwaste_bf':$(this).val()}
      var $field4 = {'werwaste_af':$(this).val()}
  
      var $field5 = (($field1+ $field3) - ($field2 + $field4))
      
      var $endpoint= window.location.href // or localhost/interface
      $.ajax({
          method: "GET",
          url: $endpoint,
          data: $field5,
          success: handleFormSuccess,
          error: handleFormError,
      })
  })
  
  function handleFormSuccess(data){
    document.getElementById("rejected").innerHTML = `[${data}]`;
  }
  
  function handleFormError(jqXHR, textStatus, errorThrown){
      console.log(jqXHR)
      console.log(textStatus)
      console.log(errorThrown)
  }
  