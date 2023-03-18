const mongoose=require('mongoose');
require('dotenv').config()


mongoose.connect(process.env.url)
.then(()=>{
    console.log('connect success')
})
