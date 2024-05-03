import * as services from '../sevices'

export const getBenhVien = async (req, res) => {
    try {
        const result = await services.getBenhVien(req.query);
        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', users: null });
    }
};