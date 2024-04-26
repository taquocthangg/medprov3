import * as services from '../sevices'

export const themMoiChuyenKhoa = async (req, res) => {
    try {
        const { id_benhVien } = req.params;
        const { name, description, price } = req.body
        if (!name) return res.status(400).json({
            err: 1,
            mess: "Điền đầy đủ thông tin"
        })
        const response = await services.themChuyenKhoa({ name, description, id_benhVien, price })

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}


export const getChuyenKhoas = async (req, res) => {
    try {
        // Lấy userId từ request params
        const { id_benhVien } = req.params;
        // Gọi hàm lấy thông tin người dùng từ service
        const result = await services.getChuyenKhoa(id_benhVien);
        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', user: null });
    }
};