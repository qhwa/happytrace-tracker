"use strict";

(function() {
  /*
   * Happytrace
   * 统计浏览器端的错误事件、用户事件
   *
   * usage:
   *
   *  Happytrace.trackAction({
   *    user: 'qhwa'
   *    action: 'login'
   *  });
   */
  var Happytrace = {

    version: '0.1.0',

    defaultConfigs: {
      host: 'http://localhost:3000/track.jsonp',
    },

    trackAction: function( data ) {
      if( $.type( data ) === 'string' ) {
        data = {
          user: null,
          action: data
        }
      }
      $.ajax({
        url: this.getHost(),
        type: 'GET',
        data: {
          client_id:  this.getClientId(),
          data:       JSON.stringify(data),
          project_id: '53f9a11171687739dc010000'
        },
        dataType: 'jsonp'
      }).done(function(result){
        if( result.success ) {
          console.log( 'action saved' );
        }
      }).fail(function(){
        //TODO: log and retry
      });
    },

    getHost: function() {
      var dom = document.scripts[document.scripts.length - 1];
      return dom && dom.getAttribute('data-happytrace-host') || this.defaultConfigs.host;
    },

    getClientId: function() {
      return 'test-client';
    }

  };

  window.Happytrace = Happytrace;

  $(document).on( 'userAction', function( evt, data ) {
    Happytrace.trackAction(data);
  });

})();
