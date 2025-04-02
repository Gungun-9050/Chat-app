import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

    config()



    // Configuration
    cloudinary.config({ 
 
        cloud_name:'dlpjhdtgh' , 
        api_key:'737571224267937', 
        api_secret:'3RmGqgY9BbAsqnZpNJAp3SoizOc', // Click 'View API Keys' above to copy your API secret
    });

    export default cloudinary;
