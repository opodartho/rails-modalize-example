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
  });
}());
