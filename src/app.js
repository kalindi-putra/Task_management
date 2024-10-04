const express = require('express');
const sequelize = require('./services/db');
const authRoutes = require('./controllers/authRoutes');
const taskRoutes = require('./controllers/taskRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.use('/',()=>{
	res.json({data:"test"})
})

//logging the hits

//app port in env file or default 5000
const APP_PORT=process.env.APP_PORT == undefined ? 5000 : APP_PORT


const start = async () => {
	    try {
		            await sequelize.sync({force:false}); // Sync models
		            app.listen(APP_PORT, () => {
				                console.log('Server is running on port 5000');
				            });
		        } catch (error) {
				        console.error('Unable to connect to the database:', error);
				    }
};




start();


