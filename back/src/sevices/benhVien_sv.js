import { Op } from "sequelize";
import db from '../models'



export const getBenhVien = ({ page, limit, order, name, sex, address, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { raw: true, nest: true }
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_BV
        queries.offset = offset * fLimit
        queries.limit = fLimit

        if (order) queries.order = [order]
        if (name) query.name = { [Op.substring]: name }
        if (sex) query.gioiTinh = { [Op.substring]: sex }
        if (address) query.diaChi = { [Op.substring]: address }
        query.role_id = "R2"
        const benhvien = await db.User.findAndCountAll({
            where: query,
            attributes: { exclude: ['password', 'id_chuyenKhoa'] },
            include: [
                {
                    model: db.Rate,
                    as: 'rates',
                }
            ],
            ...queries
        });
        // Trả về thông tin bệnh viện
        resolve({
            err: 0,
            mess: 'Lấy thông tin bệnh viện thành công',
            benhvien
        });
    } catch (error) {
        reject(error);
    }
});