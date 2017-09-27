const modalStyles = {
  overlay : {
    position                   : 'fixed',
      top                        : -70,
      left                       : 0,
      right                      : 0,
      bottom                     : 0,
      backgroundColor            : 'rgba(50, 50, 50, 0.5)',
      zIndex                     :  9999,
  },
  content : {
    position                   : 'absolute',
      left                       : 0,
      right                      : 0,
      top                        : -200,
      marginLeft                 : 'auto',
      marginRight                : 'auto',
      width                      : 525,
      minHeight                  : 350,
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '6px',
      outline                    : 'none',
      justifyContent             : 'center',
      background                 : '#fff',
      boxSizing                  : 'border-box',

  }
};

export default modalStyles;