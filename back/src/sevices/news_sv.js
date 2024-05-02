import db from "../models";

// export const addNews = ({ image, title, description, htmlContent, markDownContent, news_types, author }) => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.New.findOrCreate({
//             where: { title },
//             defaults: {
//                 image,
//                 title,
//                 description,
//                 htmlContent,
//                 markDownContent,
//                 news_types,
//                 author,
//             }
//         })
//         resolve({
//             err: response[1] ? 0 : 1,
//             mess: response[1] ? 'Thêm mới tin tức thành công !!!' : "Tin tức đã tồn tại",
//         });
//     } catch (error) {
//         reject(error);
//     }
// });
export const addNews = (io, { image, title, description, htmlContent, markDownContent, news_types, author }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.New.findOrCreate({
                where: { title },
                defaults: {
                    image,
                    title,
                    description,
                    htmlContent,
                    markDownContent,
                    news_types,
                    author,
                }
            });

            response[1] ? io.emit('newNewsAdded', {
                success: true,
                message: 'Tin tức đã được thêm thành công',
            }) : io.emit('newNewsAdded', {
                success: false,
                message: 'Tin tức đã tồn tại',
            })
            io.to(`user_${author}`).emit('newNewsAdded', { success: true });

            resolve({
                err: response[1] ? 0 : 1,
                mess: response[1] ? 'Thêm mới tin tức thành công !!!' : "Tin tức đã tồn tại",
            });
        } catch (error) {
            io.emit('newNewsAdded', { success: false, error: error.message });

            reject(error);
        }
    });
};

export const getNews = ({ page, limit, order, name, sex, address, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { raw: true, nest: true }
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_TT
        queries.offset = offset * fLimit
        queries.limit = fLimit

        if (order) queries.order = [order]
        if (name) query.name = { [Op.substring]: name }
        if (sex) query.gioiTinh = { [Op.substring]: sex }
        if (address) query.diaChi = { [Op.substring]: address }
        const response = await db.New.findAndCountAll({
            where: query,
            ...queries,
            include: [
                {
                    model: db.User,
                    as: 'authors',
                    attributes: ['id', 'name', 'avatar'],
                },],
            attributes: { exclude: ['author', 'markDownContent'] },
        });
        // Trả về thông tin tin tức
        resolve({
            err: 0,
            mess: response ? 'Lấy thông tin tin tức thành công' : 'Lấy thông tin thất bại',
            response
        });
    } catch (error) {
        reject(error);
    }
});


export const getCurentNews = (newsId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.findByPk(newsId, {
            include: [
                {
                    model: db.User,
                    as: 'authors',
                    attributes: ['id', 'name', 'avatar'],
                },
                {
                    model: db.Comment,
                    as: 'comments',
                    attributes: { exclude: ['newsId', 'userID'] },
                    include: [{
                        model: db.User,
                        as: 'user',
                        attributes: ['id', 'name', 'avatar'],
                    }]
                }
            ],
            attributes: { exclude: ['author',] },

        });

        resolve({
            err: response ? 1 : 0,
            mess: response ? 'Lấy thông tin tin tức thành công' : 'Lấy thông tin tin tức thất bại ',
            response
        });
    } catch (error) {
        reject(error);
    }
});
export const getRates = (newsId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Rate.findByPk(newsId, {
            include: [
                {
                    model: db.User,
                    as: 'evaluated',
                    attributes: ['id', 'name', 'avatar'],
                },
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'name', 'avatar'],
                },
            ],
            attributes: { exclude: ['author',] },

        });

        resolve({
            err: response ? 1 : 0,
            mess: response ? 'Lấy thông tin tin tức thành công' : 'Lấy thông tin tin tức thất bại ',
            response
        });
    } catch (error) {
        reject(error);
    }
});
