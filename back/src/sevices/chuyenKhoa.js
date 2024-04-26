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
