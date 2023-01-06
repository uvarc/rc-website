// remove the search modal
var searchKey = '';

document.removeEventListener('keydown', function(e) {
  var key = searchKey[e.keyCode];
}); 

// look for SLURM magic
const keySequence = [
  's',
  'l',
  'u',
  'r',
  'm',
];

let userInput = new Array( keySequence.length );

window.addEventListener( 'keydown', ( { key } ) => {
  userInput = [ ...userInput.slice( 1 ), key ];

  if ( keySequence.every( ( v, k ) => v === userInput[ k ] ) ) {
      alert( 'Would you like to take a SLURM quiz?' );
  }
} );

function showSlurmGame() {
  $('.slurm-modal').modal('show')
}; 
