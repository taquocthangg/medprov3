import { Op } from "sequelize";
import db from '../models'



export const getUser = ({ page, limit, order, name, sex, address, ...query }) => new Promise(async (resolve, reject) => {
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
        query.role_id = "R4"
        const users = await db.User.findAndCountAll({
            where: query,
            attributes: { exclude: ['password', 'id_chuyenKhoa'] },
            ...queries,
        });
        const counts = users.count;
        // Trả về thông tin bệnh nhân
        resolve({
            err: 0,
            mess: 'Lấy thông tin bệnh nhân thành công',
            count: `${counts}`,
            users
        });
    } catch (error) {
        reject(error);
    }
});

export const getCurents = (userId) => new Promise(async (resolve, reject) => {
    try {

        const user = await db.User.findByPk(userId);

        if (!user) {
            resolve({
                err: -1,
                mess: 'Người dùng không tồn tại',
                user: null
            });
            return;
        }

        // Trả về thông tin người dùng
        resolve({
            err: 0,
            mess: 'Lấy thông tin người dùng thành công',
            user
        });
    } catch (error) {
        reject(error);
    }
});

export const updateUser = async ({ userId, name, newEmail, newPassword, gioiTinh, sdt, diaChi, image, namSinh }) => {
    try {
        const updateValues = {
            name: name || undefined,
            email: newEmail || undefined,
            password: newPassword ? hashPassword(newPassword) : undefined,
            gioiTinh: gioiTinh || undefined,
            namSinh: namSinh || undefined,
            sdt: sdt || undefined,
            diaChi: diaChi || undefined,
            avatar: image || undefined,
        };

        // Lọc bỏ các giá trị undefined để giữ nguyên giá trị nếu không được cung cấp
        const filteredUpdateValues = Object.fromEntries(Object.entries(updateValues).filter(([key, value]) => value !== undefined));

        const response = await db.User.update(
            filteredUpdateValues,
            {
                where: { id: userId },
            }
        );

        if (response === 0) {
            return {
                err: 1,
                mess: 'Người dùng không tồn tại',
            };
        }

        return {
            err: 0,
            mess: 'Cập nhật thông tin người dùng thành công',
        };
    } catch (e) {
        throw e;
    }
};

export const deleteUser = ({ userId }) => new Promise(async (resolve, reject) => {
    try {
        const deletedSchedule = await db.User.destroy({
            where: { id: userId },
        });

        resolve({
            err: deletedSchedule === 0,
            mess: deletedSchedule === 0 ? 'Không tìm thấy user ' : 'Xóa user thành công',
        });
    } catch (e) {
        reject(e);
    }
});