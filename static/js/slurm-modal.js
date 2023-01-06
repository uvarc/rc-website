// remove the search modal
var searchKey = '';

document.removeEventListener('keydown', function(e) {
  var key = searchKey[e.keyCode];
}); 

// look for SLURM magic
const keySeq = [
  's',
  'l',
  'u',
  'r',
  'm',
];

let userInput = new Array( keySeq.length );

window.addEventListener( 'keydown', ( { key } ) => {
  userInput = [ ...userInput.slice( 1 ), key ];

  if ( keySeq.every( ( v, k ) => v === userInput[ k ] ) ) {
      // alert( 'Would you like to take a SLURM quiz?' );
      window.location.replace("https://www.rc.virginia.edu/slurm/");
  }
} );

