import * as services from '../sevices'

export const getDocter = async (req, res) => {
    try {
        const result = await services.getDocter(req.query);
        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};


export const getAllBacSiByChuyenKhoa = async (req, res) => {
    try {
        const { id_chuyenKhoa } = req.params;
        const { id_benhVien } = req.body;
        const result = await services.getBacSiByChuyenKhoa({ id_chuyenKhoa, id_benhVien });

        if (result.err === 0) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};



export const themMoiBacSi = async (req, res) => {
    try {
        const { id_chuyenKhoa } = req.params;
        const fileData = req.file;
        const avatar = fileData?.path;
        const { name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, description, id_benhVien } = req.body
        if (!name) return res.status(400).json({
            err: 1,
            mess: "Điền đầy đủ thông tin"
        })
        const response = await services.themBacSi({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, description, id_chuyenKhoa, avatar, id_benhVien })

        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Loi sever"
        })
    }
}