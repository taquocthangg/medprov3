// import * as controller from '../controllers'
// import express from 'express'
// const router = express.Router();


// router.post('/addNews', controller.addNews)
// router.get('/getNews', controller.getNews)
// router.get('/getCurentNews/:newsId', controller.getCurentNews)
// router.get('/getRates/:newsId', controller.getRates)

// module.exports = router

// routes/news.js

import * as controller from '../controllers'
import express from 'express'
const router = express.Router();

const newsRoutes = (io) => {
    router.post('/addNews', controller.addNews(io))
    router.get('/getNews', controller.getNews)
    router.get('/getCurentNews/:newsId', controller.getCurentNews)
    router.get('/getRates/:newsId', controller.getRates)

    return router;
}

module.exports = newsRoutes;
