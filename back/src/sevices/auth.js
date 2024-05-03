import db from '../models'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
const moment = require('moment');

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))


// Hàm đăng ký
export const dangKi = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, avatar }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                gioiTinh,
                namSinh,
                sdt,
                diaChi,
                role_id,
                avatar
            }
        })
        const token = response[1] ? jwt.sign({
            id: response[0].id,
            email: response[0].email,
            role_id: response[0].role_id,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
            'access_token': token ? token : token
        })
    }
    catch (e) {
        reject(e)
    }
})







// export const updateUser = ({ userId,name, newEmail, newPassword, image }) => new Promise(async (resolve, reject) => {
//     try {
//         
//         const user = await db.User.findByPk(userId);
//         if (!user) {
//             resolve({
//                 err: 1,
//                 mess: 'Người dùng không tồn tại'
//             });
//             return;
//         }
//       
//         if (name) {
//             user.name = name;
//         }
//         if (newEmail) {
//             user.email = newEmail;
//         }
//         if (newPassword) {
//             user.password = hashPassword(newPassword);
//         } if (image) {
//             user.avatar = image;
//         }
//         // Lưu các thay đổi vào cơ sở dữ liệu
//         await user.save();

//         resolve({
//             err: 0,
//             mess: 'Cập nhật thông tin người dùng thành công'
//         });
//     } catch (e) {
//         reject(e);
//     }
// });


// Hàm đăng nhập
export const dangNhap = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })

        // check password
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked ? jwt.sign({
            id: response.id,
            email: response.email,
            role_id: response.role_id,
            id_chuyenKhoa: response.id_chuyenKhoa,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        resolve({
            err: token ? 0 : 1,
            mess: token ? 'Đăng nhập thành công' : response ? 'Mật khẩu sai' : 'Tài khoản chưa được đăng kí',
            'access_token': token ? `${token}` : token
        })
    }
    catch (e) {
        reject(e)
    }
})

createPayment
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'quocthangforwork@gmail.com',
        pass: 'gtovgcshoqnolyao',
    },
});

// Hàm gửi email để quên mật khẩu
export const forgotPassword = async (email) => {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await db.User.findOne({ where: { email } });
    let errorMessage = null;
    if (user) {
        user.resetToken = token;
        await user.save();

        const resetLink = process.env.URL_SERVER + `/api/v1/auth/reset-password/${token}`;
        const mailOptions = {
            from: 'medpro@gmail.com',
            to: email,
            subject: 'Đặt lại mật khẩu',
            html: `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. ${resetLink}`
        };

        await transporter.sendMail(mailOptions);
    } else {
        throw errorMessage = 'Người dùng không tồn tại.';
    }
    return errorMessage;
};

// Hàm đặt lại mật khẩu
export const resetPassword = async (token, newPassword) => {

    const user = await db.User.findOne({
        where: {
            resetToken: token,
            // resetTokenExpiry: { [Sequelize.Op.gt]: Date.now() },
        }, createPayment
    });

    if (user) {
        const saltRounds = 10; // Số lượng vòng lặp hash
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
    } else {
        throw new Error('Token không hợp lệ hoặc đã hết hạn.');
    }
};







export const themLichKham = ({ hospitalId, doctorId, patientId, timeSlot, price, appointmentDate, specialtyId, activateDay }) => new Promise(async (resolve, reject) => {
    try {
        for (const timeSlots of timeSlot) {
            const [startTime, endTime] = timeSlots.split('-');
            const newSchedule = await db.Schedule.findOrCreate({
                where: { doctorId, timeSlot: timeSlots, activateDay },
                defaults: {
                    doctorId,
                    patientId,
                    specialtyId,
                    hospitalId,
                    timeSlot: timeSlots,
                    price,
                    activateDay,
                    appointmentDate,
                    status: 'available',
                    startTime,
                    endTime,
                },
            });
            resolve({
                err: !newSchedule[1],
                mess: newSchedule[1] ? 'Thêm lịch mới thành công' : 'Lịch khám đã tồn tại',
            });
        }
    } catch (e) {
        reject(e);
    }
});

export const datLich = ({ id_lichkham, id_benhNhan }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: id_lichkham } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        const checkStatus = schedule.status === 'canceled' || schedule.status === 'completed' || schedule.status === 'booked'
        const check = schedule ? checkStatus : schedule
        schedule.status = 'booked';
        schedule.patientId = id_benhNhan;
        await schedule.save();
        resolve({
            err: schedule ? '1' : '0',
            mess: check ? "Lịch khám đã được đặt" : "Đặt Lịch Thành Công"
        });
    } catch (e) {
        reject(e)
    }
})

export const huyLichKham = ({ id_lichkham }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: id_lichkham } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        const checkStatus = schedule.status === 'canceled' || schedule.status === 'completed'
        const check = schedule ? checkStatus : schedule
        schedule.status = 'canceled';
        await schedule.save();
        resolve({
            err: schedule ? '1' : '0',
            mess: check ? "Lịch khám đã được hủy hoặc đã hoàn thành" : "Lịch khám đã được hủy"
        });
    } catch (e) {
        reject(e)
    }
})

export const xacNhanLichKham = ({ id_lichkham }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: id_lichkham } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        const checkStatus = schedule.status === 'canceled' || schedule.status === 'completed'
        const check = schedule ? checkStatus : schedule
        schedule.status = 'completed';
        await schedule.save();
        resolve({
            err: schedule ? '1' : '0',
            mess: check ? "Lịch khám đã được hủy hoặc đã hoàn thành" : "Đã xác nhận hoàn thành lịch khám"
        });
    } catch (e) {
        reject(e)
    }
})

export const getLichKham = ({ activateDay, id_doctor }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Schedule.findAndCountAll({
            where: {
                doctorId: id_doctor, activateDay, status: 'available'
            },
            include: [
                {
                    model: db.Sescription,
                    attributes: ['id_benhVien'],
                },
            ],
        });

        const schedule = response.rows.map(row => ({
            id: row.id,
            timeSlot: row.timeSlot,
            id_benhVien: row.Sescription,
        }));

        // Sắp xếp schedule theo thứ tự thời gian từ bé đến lớn
        schedule.sort((a, b) => {

            const timeA = parseInt(a.timeSlot.split(':')[0]);
            const timeB = parseInt(b.timeSlot.split(':')[0]);


            return timeA - timeB;
        });

        const counts = response.count;

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: counts ? 'Lấy thông tin lịch khám thành công' : "Lấy thông tin lịch khám thất bại",
            count: `${counts}`,
            schedule: counts ? schedule : "Không có lịch khám"
        });
    } catch (error) {
        reject(error);
    }
});
export const getInfomationChuyenKhoa = ({ id_chuyenKhoa }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Sescription.findByPk(id_chuyenKhoa)
        console.log(response)
        resolve({
            err: 0,
            mess: response ? "Lấy thông tin chuyên khoa thành công" : "Lấy thông tin chuyên khoa thất bại",
            chuyenKhoa: response
        })
    }
    catch (e) {
        reject(e)
    }
})
export const getLichKhamById = ({ getSchedulebyID }) => new Promise(async (resolve, reject) => {
    try {

        const id = getSchedulebyID
        const Data = await db.Schedule.findByPk(id, {
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'name', 'sdt', 'diaChi', 'namSinh', 'gioiTinh'],
                },
            ],
        });
        //console.log(Data);
        // const id_benhvien = Data.map(schedule => schedule.dataValues.hospitalId);
        // const UsersFromBenhVien = await db.User.findAll({
        //     where: {
        //         id: id_benhvien,
        //     },
        //     attributes: ['name', 'sdt', 'diaChi'],
        // });
        const name = Data.dataValues.specialtyId;
        const InforChuyenKhoa = await db.Sescription.findAll({
            where: {
                id: name,
            },
            attributes: ['id', 'name', 'id_benhVien'],
        });
        const benhVienId = InforChuyenKhoa[0].dataValues.id_benhVien;
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: benhVienId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi'],
        });
        const id_bacsi = Data.dataValues.doctorId;
        const InforBacSi = await db.User.findAll({
            where: {
                id: id_bacsi,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBenhVien: UsersFromBenhVien,
            InforChuyenKhoa: InforChuyenKhoa,
            InforBacSi: InforBacSi

        });
    } catch (error) {
        reject(error);
    }
});
export const getLichKhambyBooked = ({ activateDay, id_doctor }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Schedule.findAndCountAll({
            where: {
                doctorId: id_doctor, activateDay, status: 'booked'
            },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'name'],
                },
                // {
                //     model: db.Sescription,
                //     attributes: ['id_benhvien'],
                // },
            ],
        });

        const schedule = response.rows.map(row => ({
            id: row.id,
            timeSlot: row.timeSlot,
            activateDay: row.activateDay,
            Users: row.User,
            id_benhVien: row.Sescription
        }));

        // Sắp xếp schedule theo thứ tự thời gian từ bé đến lớn
        schedule.sort((a, b) => {

            const timeA = parseInt(a.timeSlot.split(':')[0]);
            const timeB = parseInt(b.timeSlot.split(':')[0]);


            return timeA - timeB;
        });

        const counts = response.count;

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: counts ? 'Lấy thông tin lịch khám thành công' : "Lấy thông tin lịch khám thất bại",
            count: `${counts}`,
            schedule: counts ? schedule : "Không có lịch khám"
        });
    } catch (error) {
        reject(error);
    }
});
export const xoaLichKhamById = ({ scheduleId }) => new Promise(async (resolve, reject) => {
    try {
        const deletedSchedule = await db.Schedule.destroy({
            where: { id: scheduleId },
        });

        resolve({
            err: deletedSchedule === 0,
            mess: deletedSchedule === 0 ? 'Không tìm thấy lịch khám' : 'Xóa lịch khám thành công',
        });
    } catch (e) {
        reject(e);
    }
});

export const getLichDatKhambyIdBenhNhan = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.Schedule.findAll({
            where: { patientId: id_benhnhan, status: 'booked' },
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        const hospitalId = Data.map(schedule => schedule.dataValues.hospitalId);
        const InforBenhVien = await db.User.findAll({
            where: {
                id: hospitalId,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        const id_chuyenKhoa = Data.map(schedule => schedule.dataValues.specialtyId);
        const InforChuyenKhoa = await db.Sescription.findAll({
            where: {
                id: id_chuyenKhoa,
            },
            attributes: ['name'],
        });

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBacSi: UsersFromBenhVien,
            InforChuyenKhoa: InforChuyenKhoa,
            InforBenhVien
        });
    } catch (error) {
        reject(error);
    }
});
export const getLichDaKhambyIdBenhNhan = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.Schedule.findAll({
            where: { patientId: id_benhnhan, status: 'completed' },
        });
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBacSi: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});
export const getLichDaHuybyIdBenhNhan = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.Schedule.findAll({
            where: { patientId: id_benhnhan, status: 'canceled' },
        });
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBacSi: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});
export const themLichSuKham = ({ scheduleId, hospitalId, doctorId, patientId, timeSlot, appointmentDate, specialtyId, diagnosis, medication }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findOne({ where: { id: scheduleId } });
        if (!schedule) {
            resolve({
                err: 1,
                mess: 'Lịch khám không tồn tại'
            });
        }
        else {
            schedule.status = 'completed';
            await schedule.save();
            const history = await db.MedicalHistory.create({
                patientId,
                doctorId,
                specialtyId,
                hospitalId,
                timeSlot,
                appointmentDate,
                diagnosis,
                medication,
            });
            resolve({
                err: !history,
                mess: history ? 'Thêm lịch sử khám mới thành công' : 'Lịch sử khám đã tồn tại',
            });
        }
    } catch (e) {
        reject(e);
    }
});

export const getAllLichSuKham = ({ id_doctor, appointmentDate }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.MedicalHistory.findAndCountAll({
            where: {
                doctorId:id_doctor,
                appointmentDate:appointmentDate
            },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'name','email','gioiTinh','namSinh','sdt','diaChi'],
                },
          
            ],
        })
        console.log(response)
        resolve({
            err: response ? 0 : -1,
            mess:response?"Lấy thông tin bệnh án thành công":"Lấy thông tin bệnh án thất bại",
            MedicalHistory:response
        })
    } catch (e) {
        reject(e);
    }
})

const { Op, where } = require('sequelize');
export const getLichSuKhamById = ({ getLichSuKhamById, ngay, tenBenhNhan }) => new Promise(async (resolve, reject) => {
    try {
        console.log(getLichSuKhamById)

        let whereCondition = { doctorId: getLichSuKhamById };
        if (ngay) {
            whereCondition = { appointmentDate: ngay };
        }
        const Data = await db.MedicalHistory.findAll({
            where: whereCondition,
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'name', 'sdt', 'diaChi', 'namSinh', 'gioiTinh'],
                    where: {
                        name: {
                            [Op.like]: `%${tenBenhNhan}%`
                        },
                    },
                },
            ],
        });
        let name;
        // Data.forEach((medicalHistory, index) => {
        //     // medicalHistory.Sescription sẽ chứa thông tin từ bảng Sescription
        //     if (!name && index === 0) {
        //         const sescriptionData = medicalHistory.Sescription.dataValues.id_benhvien;
        //         name = sescriptionData;
        //         console.log(name)
        //     }
        // });
        // console.log(name)
        // const UsersFromBenhVien = await db.User.findAll({
        //     where: {
        //         id: name,
        //     },
        //     attributes: ['name', 'sdt', 'diaChi'],
        // });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            //InforBenhVien: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});

export const getLichSuKhamBy = ({ getLichSuKhamById, }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.MedicalHistory.findAll({
            where: { id: getLichSuKhamById },
            include: [
                {
                    model: db.User, // Sử dụng tên mô hình mặc định 'user'
                    attributes: ['id', 'name', 'sdt', 'diaChi', 'namSinh', 'gioiTinh'],
                },
            ],
        });
        const name = Data[0].dataValues.hospitalId;
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: name,
            },
            attributes: ['name', 'sdt', 'diaChi'],
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBenhVien: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});


export const deleteChuyenKhoa = ({ id_chuyenKhoa }) => new Promise(async (resolve, reject) => {
    try {
        const deletedSchedule = await db.Sescription.destroy({
            where: { id: id_chuyenKhoa },
        });

        resolve({
            err: deletedSchedule === 0,
            mess: deletedSchedule === 0 ? 'Không tìm thấy chuyên khoa ' : 'Xóa chuyên khoa thành công',
        });
    } catch (e) {
        reject(e);
    }
});
export const lichkhamHoanThanh = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.MedicalHistory.findAll({
            where: { patientId: id_benhnhan },
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const hospitalId = Data.map(schedule => schedule.dataValues.hospitalId);
        const inforhospitalId = await db.User.findAll({
            where: {
                id: hospitalId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi'],
        });
        const chuyenKhoaId = Data.map(schedule => schedule.dataValues.specialtyId);
        const InforChuyenKhoa = await db.Sescription.findAll({
            where: {
                id: chuyenKhoaId,
            },
            attributes: ['id', 'name'],
        });
        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            InforBacSi: UsersFromBenhVien,
            InforChuyenKhoa: InforChuyenKhoa,
            InforBenhVien: inforhospitalId,
        });
    } catch (error) {
        reject(error);
    }
});
export const benhAnBenhVien = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.MedicalHistory.findAll({
            where: { hospitalId: id_benhnhan },
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }
        const patientId = Data.map(schedule => schedule.dataValues.patientId);
        const Inforpatient = await db.User.findAll({
            where: {
                id: patientId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const hospitalId = Data.map(schedule => schedule.dataValues.hospitalId);
        const inforhospitalId = await db.User.findAll({
            where: {
                id: hospitalId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi'],
        });
        const chuyenKhoaId = Data.map(schedule => schedule.dataValues.specialtyId);
        const InforChuyenKhoa = await db.Sescription.findAll({
            where: {
                id: chuyenKhoaId,
            },
            attributes: ['id', 'name'],
        });
        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            Inforpatient: Inforpatient
        });
    } catch (error) {
        reject(error);
    }
});
export const benhAnTheoLichs = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.MedicalHistory.findAll({
            where: { id: id_benhnhan },
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }
        const patientId = Data.map(schedule => schedule.dataValues.patientId);
        const Inforpatient = await db.User.findAll({
            where: {
                id: patientId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const hospitalId = Data.map(schedule => schedule.dataValues.hospitalId);
        const inforhospitalId = await db.User.findAll({
            where: {
                id: hospitalId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi'],
        });
        const chuyenKhoaId = Data.map(schedule => schedule.dataValues.specialtyId);
        const InforChuyenKhoa = await db.Sescription.findAll({
            where: {
                id: chuyenKhoaId,
            },
            attributes: ['id', 'name'],
        });
        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            Inforpatient: Inforpatient,
            InforChuyenKhoa: InforChuyenKhoa,
            InforBenhVien: UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});
export const LichKhamDaHuy = ({ id_benhnhan }) => new Promise(async (resolve, reject) => {
    try {
        const Data = await db.Schedule.findAll({
            where: { doctorId: id_benhnhan, status: 'canceled' },
        });
        if (!Data) {
            resolve({
                err: -1,
                mess: 'Lịch khám không tồn tại',
                Data: null,
            });
            return;
        }
        const patientId = Data.map(schedule => schedule.dataValues.patientId);
        const Inforpatient = await db.User.findAll({
            where: {
                id: patientId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const doctorIds = Data.map(schedule => schedule.dataValues.doctorId);
        const UsersFromBenhVien = await db.User.findAll({
            where: {
                id: doctorIds,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi', 'gioiTinh'],
        });
        const hospitalId = Data.map(schedule => schedule.dataValues.hospitalId);
        const inforhospitalId = await db.User.findAll({
            where: {
                id: hospitalId,
            },
            attributes: ['id', 'name', 'sdt', 'diaChi'],
        });
        const chuyenKhoaId = Data.map(schedule => schedule.dataValues.specialtyId);
        const InforChuyenKhoa = await db.Sescription.findAll({
            where: {
                id: chuyenKhoaId,
            },
            attributes: ['id', 'name'],
        });
        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: 'Lấy thông tin lịch khám thành công',
            Data,
            Inforpatient: Inforpatient,
            // InforChuyenKhoa:InforChuyenKhoa,
            // InforBenhVien:UsersFromBenhVien
        });
    } catch (error) {
        reject(error);
    }
});





export const createPayment = ({ amount, language, bankCode, ipAddr }) => new Promise(async (resolve, reject) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;
        let vnpUrl = process.env.vnp_Url;
        let returnUrl = process.env.vnp_ReturnUrl;
        let orderId = moment(date).format('DDHHmmss');
        if (language === null || language === '') {
            language = 'vn';
        }

        if (amount === null || amount === '') {
            amount = 10000;
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: vnpUrl ? 'Tạo đơn hàng thành công' : '',
            vnpUrl
        });
    } catch (error) {
        reject(error);
    }
});
export const returnPayment = ({ vnp_Params }) => new Promise(async (resolve, reject) => {
    try {
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            resolve({
                err: 0,
                mess: secureHash === signed ? 'Thanh Toán thành công' : '',
                code: vnp_Params['vnp_ResponseCode']
            });
            // res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
        } else {
            // res.render('success', { code: '97' })
            vnp_Params
        }
        // Trả về thông tin lịch khám
        resolve({
            err: 0,
            mess: secureHash === signed ? 'Thanh Toán thành công' : '',
            vnpUrl
        });
    } catch (error) {
        reject(error);
    }
});
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}