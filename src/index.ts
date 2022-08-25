import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import sequelize from "@repos/sequelize";
import models from "@models/index";


// Constants
const serverStartMsg = 'Express server started on port: ',
    port = (process.env.PORT || 3000);


sequelize.getInstance().sync().then(async () => {
    await models.sync();
    server.listen(port, () => {
        logger.info(serverStartMsg + port);
    });
}).catch(err => {
    console.log(err);
})
// Start server

