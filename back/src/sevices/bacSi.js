import { Op } from "sequelize";
import db from '../models'
import bcrypt from 'bcryptjs'
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))


export const getDotor = ({ page, limit, order, name, sex, address, ...query }) => new Promise(async (resolve, reject) => {
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
        query.role_id = "R3"
        const bacsi = await db.User.findAndCountAll({
            where: query,
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: db.Rate,
                    as: 'rates',
                }
            ],
            ...queries
        });
        const counts = bacsi.count;
        // Trả về thông tin bác sĩ
        resolve({
            err: 0,
            mess: 'Lấy thông tin bác sĩ thành công',
            count: `${counts}`,
            bacsi
        });
    } catch (error) {
        reject(error);
    }
});

export const getBacSiByChuyenKhoa = ({ id_chuyenKhoa }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            where: {
                id_chuyenKhoa: id_chuyenKhoa
            }
        });

        // if (users.length === 0) {
        //     resolve({
        //         err: -1,
        //         mess: 'Không tìm thấy bác sĩ theo chuyên khoa',
        //         response: null
        //     });
        //     return;
        // }

        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: response ? 'Lấy thông tin bác sĩ thành công' : "Lấy thông tin bác sĩ không thành công",
            users
        });
    } catch (error) {
        reject(error);
    }
});

export const themBacSi = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, id_chuyenKhoa, avatar }) => new Promise(async (resolve, reject) => {
    try {
        const role_id = "R3"
        const user = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                gioiTinh,
                sdt,
                diaChi,
                namSinh,
                role_id,
                avatar
            },
        });
        if (id_chuyenKhoa) {
            const chuyenKhoa = await db.Sescription.findByPk(id_chuyenKhoa);

            if (chuyenKhoa) {
                // Liên kết người dùng với chuyên khoa
                await user[0].update({ id_chuyenKhoa: id_chuyenKhoa });
            }
        }

        resolve({
            err: !user[1],
            mess: user[1] ? 'Đăng ký thành công' : 'Tài khoản đã tồn tại',
        });

    }
    catch (e) {
        reject(e)
    }
})