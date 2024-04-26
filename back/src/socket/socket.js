import db from '../models'

function initialize(io) {
    const groups = [];
    const joinedGroups = new Set();
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinGroupAndGetSchedule', async (data) => {
            const { userId, doctorId, activateDay } = data;
            console.log(doctorId)
            console.log(activateDay);
            if (!userId || !doctorId) {
                console.error('Missing userId or doctorId');
                return;
            }
            if (activateDay) {
                await getLichKham(socket, doctorId, activateDay)
            }
            // Kiểm tra xem người dùng đã tham gia nhóm của bác sĩ này chưa
            const hasJoined = joinedGroups.has(`${userId}-${doctorId}`);
            if (hasJoined) {
                console.error('User has already joined this group');
                console.log(groups)
                return;
            }

            // Thêm userId của người dùng vào nhóm tương ứng với bác sĩ
            const groupIndex = groups.findIndex(group => group.doctorId === doctorId);
            if (groupIndex !== -1) {
                groups[groupIndex].members.push(userId);
            } else {
                groups.push({ doctorId, members: [userId] });
            }

            // Thêm vào danh sách nhóm mà người dùng đã tham gia
            joinedGroups.add(`${userId}-${doctorId}`);

            // Console.log giá trị mới của groups sau khi cập nhật
            // console.log(groups);
        });

        socket.on('disconnect', () => {
            // Xóa userId của người dùng khỏi danh sách nhóm khi người dùng ngắt kết nối
            for (const group of groups) {
                const index = group.members.indexOf(userId);
                if (index !== -1) {
                    group.members.splice(index, 1);
                    // Xóa khỏi danh sách nhóm đã tham gia
                    joinedGroups.delete(`${userId}-${group.doctorId}`);
                    break;
                }
            }
        });

        socket.on('selectSchedule', (data) => {
            const { userId, doctorId, scheduleId } = data;

            // Tìm nhóm chứa người dùng hiện tại
            const group = groups.find(group => group.doctorId === doctorId);
            console.log(group);
            if (group) {
                if (userId) {
                    // if (group.members.includes(userId)) {
                    //     socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi người dùng khác.' });
                    //     console.log("first")
                    // } else {
                    // Kiểm tra xem lịch đã được chọn chưa
                    if (group.selectedScheduleId === scheduleId) {
                        socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi .' + userId });
                        console.log("Lịch khám này đã được chọn bởi người dùng khác." + userId)
                    } else {
                        console.log("2scheduleSelected")
                        // Thêm người dùng vào nhóm và gửi thông báo cho những người dùng trong nhóm
                        group.members.forEach(memberUserId => {
                            console.log(memberUserId)
                            io.to(memberUserId).emit('scheduleSelected', { success: true, message: 'Lịch khám đã được chọn thành công.' });
                        });
                        // Cập nhật lịch đã chọn
                        group.selectedScheduleId = scheduleId;
                    }
                    // }
                }
            }
            // Kiểm tra xem người dùng đã chọn lịch khám này chưa

        });


        socket.on('themLichKham', async (data) => {
            console.log(data)
            const { hospitalId, doctorId, patientId, timeSlot, price, appointmentDate, specialtyId, activateDay } = data;
            await themLichKham(socket, hospitalId, doctorId, patientId, timeSlot, price, appointmentDate, specialtyId, activateDay)
        });
    });
}


const themLichKham = async (socket, hospitalId, doctorId, patientId, timeSlot, price, appointmentDate, specialtyId, activateDay) => {
    try {
        console.log(hospitalId)
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
            socket.emit('themLichKham', {
                err: !newSchedule[1],
                sucses: newSchedule[1],
                mess: newSchedule[1] ? 'Thêm lịch mới thành công' : 'Lịch khám đã tồn tại'
            });
        }
    } catch (error) {
        console.error("Đã xảy ra lỗi khi thêm thông tin lịch khám", error);
    }
};

const getLichKham = async (socket, doctorId, activateDay) => {
    try {
        const response = await db.Schedule.findAndCountAll({
            where: {
                doctorId,
                activateDay,
                status: 'available'
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
        console.log(response)
        // Gửi thông tin lịch khám cho người dùng
        socket.emit('getLichKham', {
            err: 0,
            mess: counts ? 'Lấy thông tin lịch khám thành công' : "Lấy thông tin lịch khám thất bại",
            count: `${counts}`,
            schedule: counts ? schedule : "Không có lịch khám"
        });
        socket.on('getLichKham', {
            err: 0,
            mess: counts ? 'Lấy thông tin lịch khám thành công' : "Lấy thông tin lịch khám thất bại",
            count: `${counts}`,
            schedule: counts ? schedule : "Không có lịch khám"
        });
    } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy thông tin lịch khám", error);
    }
};
function getIO() {
    if (!io) {
        throw new Error('Socket.io chưa được khởi tạo.');
    }
    return io;
}

module.exports = {
    initialize,
    getIO
};

