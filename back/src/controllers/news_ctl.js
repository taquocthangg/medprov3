import * as services from '../sevices'
export const addNews = (io) => async (req, res,) => {
    try {
        const { image, title, description, htmlContent, markDownContent, news_types, author } = req.body
        if (!image, !title) return res.status(400).json({
            err: 1,
            mess: "Điền đầy đủ thông tin như tiêu đề và ảnh mô tả"
        })
        const response = await services.addNews(io, { image, title, description, htmlContent, markDownContent, news_types, author })

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}

export const getNews = async (req, res) => {
    try {
        const result = await services.getNews(req.query);
        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const getCurentNews = async (req, res) => {
    try {
        const { newsId } = req.params;
        const result = await services.getCurentNews(newsId);


        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', user: null });
    }
};

export const getRates = async (req, res) => {
    try {
        const { newsId } = req.params;
        const result = await services.getRates(newsId);


        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', user: null });
    }
};