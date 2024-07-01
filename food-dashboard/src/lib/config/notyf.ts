import { browser } from '$app/environment';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export let notyf: Notyf;
if (browser) {
  notyf = new Notyf({
    duration: 4000,
    position: {
      x: 'right',
      y: 'bottom',
    }
    ,dismissible	:true,
    types: [
  
      {
        type: 'error',
        duration: 2000,
        dismissible: true ,
        position: {
          x: 'right',
          y: 'bottom',
        },
        
      }
    
    ]
  });
}
