import db from '../models'

export const themChuyenKhoa = ({ name, description, id_benhVien, price }) => new Promise(async (resolve, reject) => {
    try {
        const specialization = await db.Sescription.create({
            name,
            description,
            price
        });
        if (id_benhVien) {
            const benhVien = await db.User.findByPk(id_benhVien);

            if (benhVien) {
                // Liên kết chuyên khoa với bệnh viện
                await specialization.update({ id_benhVien: id_benhVien });
            }
        }

        resolve({
            err: false, // Không có lỗi
            mess: 'Thêm mới chuyên khoa thành công !!!',
        });
    } catch (error) {
        reject(error);
    }
});


export const getChuyenKhoa = (id_benhVien) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Sescription.findAndCountAll({
            where: {
                id_benhVien
            },
        });
        // Trả về thông tin người dùng
        const chuyenkhoa = response.rows;
        const counts = response.count;
        resolve({
            err: 0,
            mess: 'Lấy thông tin chuyên khoa thành công',
            count: `${counts}`,
            chuyenkhoa
        });
    } catch (error) {
        reject(error);
    }
});


export const updateChuyenKhoa = async ({ id_chuyenKhoa, name, description, id_benhVien, price }) => {
    try {
        const updateValues = {
            name: name || undefined,
            description: description || undefined,
            id_benhVien: id_benhVien || undefined,
            price: price || undefined,
        };

        // Lọc bỏ các giá trị undefined để giữ nguyên giá trị nếu không được cung cấp
        const filteredUpdateValues = Object.fromEntries(Object.entries(updateValues).filter(([key, value]) => value !== undefined));
        const response = await db.Sescription.update(
            filteredUpdateValues,
            {
                where: { id: id_chuyenKhoa },
            }
        );
        if (response === 0) {
            return {
                err: 1,
                mess: 'Chuyên khoa không tồn tại',
            };
        }

        return {
            err: 0,
            mess: 'Cập nhật chuyên khoa thành công',
        };
    } catch (e) {
        throw e;
    }
};
