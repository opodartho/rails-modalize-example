(function(){
  'use strict';
  let modalHolderSelector= '#modal-holder'
  let modalSelector = '.modal'

  window.Modalize = window.Modalize || {}

  let appendQueryString = (url, queryVars) => {
    let firstSeperator = (url.indexOf('?')==-1 ? '?' : '&');
    let queryStringParts = new Array();
    for(let key in queryVars) {
      queryStringParts.push(key + '=' + queryVars[key]);
    }
    let queryString = queryStringParts.join('&');
    return url + firstSeperator + queryString;
  }

  let isModal = (element) => {
    return (
      element.data('modal') !== undefined && element.data('modal') !== false
    )
  }

  $(function() {
    $(document).on('click', 'a[data-modal]', (event) => {
      event.preventDefault()
      let location = $(event.target).attr('href')
      // adding media type modal into url
      location = appendQueryString(location, {'format': 'modal'})
      $.get(location, (data) => {
        $(modalHolderSelector).html(data).
          find(modalSelector).modal({backdrop: 'static'})
      })
    })

    $(document).on('submit', 'form', (event) => {
      let form = $(event.target);
      let remote = isModal(form);
      if(remote) {
        event.preventDefault();
        let method = form.attr('method');
        let url = appendQueryString(form.attr('action'), {'format': 'modal'});
        let data = $(form[0]).serializeArray();
        $.ajax({
          method: method,
          url: url,
          data: data
        }).done(function(data, status, xhr) {
          let url = xhr.getResponseHeader('Location')
          if(url) {
            window.location = url
          } else {
            $('.modal-backdrop').remove()
            $(modalHolderSelector).html(data).
              find(modalSelector).modal()
          }
        })
      }
    })
  });
}());
