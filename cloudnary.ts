import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'ddcajmnyw', 
  api_key: '243753286919769', 
  api_secret: 'LcHdYdud8RqdH60hlQFiyxm-ReA',
  secure:true
});

module.exports = cloudinary;