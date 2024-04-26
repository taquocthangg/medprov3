import * as services from '../sevices'

export const getUser = async (req, res) => {
    try {
        const result = await services.getUser(req.query);
        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', users: null });
    }
};




export const getCurent = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await services.getCurents(userId);


        if (result.err === 0) {
            res.status(200).json({ message: result.mess, user: result.user });
        } else {
            res.status(404).json({ message: result.mess, user: null });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', user: null });
    }
};


export const updateUserController = async (req, res) => {
    try {
        const fileData = req.file;

        const image = fileData?.path;
        const userId = req.params.userId;
        const { name, newEmail, newPassword, gioiTinh, sdt, diaChi, namSinh } = req.body;
        const result = await services.updateUser({ userId, name, newEmail, newPassword, namSinh, gioiTinh, sdt, diaChi, image });


        if (result.err === 0) {
            res.status(200).json({ message: result.mess });
        } else {
            res.status(400).json({ message: result.mess });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};


export const deleteUsers = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await services.deleteUser({ userId })
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Lỗi trong quá trình xóa lịch khám.' });
    }
};