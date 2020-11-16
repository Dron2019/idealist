 var smartgrid = require('smart-grid');

 /* It's principal settings in smart grid project */
 var settings = {
     outputStyle: 'scss',
     /* less || scss || sass || styl */
     columns: 12,
     /* number of grid columns */
     offset: '20px',
     /* gutter width px || % || rem */
     mobileFirst: false,
     /* mobileFirst ? 'min-width' : 'max-width' */
     container: {
         maxWidth: '1360px',
         /* max-width оn very large screen */
         fields: '50px' /* side fields */
     },
     breakPoints: {
         lg: {
             width: '1200px',
             /* -> @media (max-width: 1100px) */
         },
         md: {
             width: '992px'
         },
         sm: {
             width: '768px',
             fields: '20px' /* set fields only if you want to change container.fields */
         },
         xs: {
             width: '575px',
             fields: ' 14px',
         }
         /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
     }
 };

 smartgrid('./src/assets/styles/assets', settings);