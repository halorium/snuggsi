const HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  const
    proxy = {}

  , link = document.querySelector // use CSS :any ?
      ('link[href*='+tag+'][rel=import]')

  , register = (event, handler) => // https://github.com/webcomponents/html-imports#htmlimports

      (HTMLImports && !!! HTMLImports.useNative)
        ? HTMLImports.whenReady
            ( _ => handler ({ target: link }) ) // eww

        : link.addEventListener
            (event, handler)


    Object
      .defineProperties (proxy, {

        'addEventListener': {
          writable: false,

          value: function (event, handler) {
            !!! link
              ? handler  ({ target: proxy })
              : register (event, handler)
          }
        }

// TODO: definition for onerror
//    , 'onerror':
//        { set (handler) {} }
      })

  return proxy
}

