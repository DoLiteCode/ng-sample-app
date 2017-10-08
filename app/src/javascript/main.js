(function(W, undefined) {
  'use strict';
  //https://www.youtube.com/watch?v=k5E2AVpwsko
  var OMIC = W.OMIC || {};

  var loadScript = function(filename, filetype, callback) {
    var fileref = null;

    callback = typeof callback !== 'function' ? function() {} : callback;

    if (filetype == "js") { //if filename is a external JavaScript file
      fileref = document.createElement('script');
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);    
    } else if (filetype == "css") { //if filename is an external CSS file
      fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);    
    }

        
    if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref);

    if (filetype == "js") { //if filename is a external JavaScript file
      if (fileref.readyState) {
        // If the bectool-rowser is Internet Explorer.
        fileref.onreadystatechange = function() {
          if (fileref.readyState == "loaded" || fileref.readyState == "complete") {
            fileref.onreadystatechange = null;
            callback();
          }
        }; // end function
      } else {
        // For any other bectool-rowser.
        fileref.onload = function() {
          callback();
        }; // end function
      }
    }


  }; // end function


  var buildJsDir = 'build/js/',
    buildNgJsDir = buildJsDir + 'ng/';

  loadScript('build/css/main.min.css', 'css');

  loadScript(buildNgJsDir + 'shim.min.js', 'js', function() {
    loadScript(buildNgJsDir + 'system.src.js', 'js', function() {
      /*
      loadScript(buildNgJsDir + 'core.umd.js', 'js', function() {
        loadScript(buildNgJsDir + 'common.umd.js', 'js', function() {
          loadScript(buildNgJsDir + 'compiler.umd.js', 'js', function() {
            loadScript(buildNgJsDir + 'platform-browser.umd.js', 'js', function() {
              loadScript(buildNgJsDir + 'platform-browser-dynamic.umd.js', 'js', function() {
                loadScript(buildNgJsDir + 'http.umd.js', 'js', function() {
                  loadScript(buildNgJsDir + 'router.umd.js', 'js', function() {
                    loadScript(buildNgJsDir + 'forms.umd.js', 'js', function() {
                      loadScript(buildNgJsDir + 'Rx.js', 'js', function() { */
      loadScript(buildJsDir + 'systemjs.config.js', 'js', function() {
        //loadScript(buildJsDir + 'boot.js', 'js', function() {});
      });
      /* });
                    });
                  });
                });
              });
            });
          });
        });
      });*/


      //System.import(buildJsDir + 'boot.js').catch(function(err) { console.error(err); });

    });
  });

})(window); // end function