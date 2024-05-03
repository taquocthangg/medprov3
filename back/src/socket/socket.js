import db from '../models'

function initialize(io) {
    const groups = [];
    const joinedGroups = new Set();
    io.on('connection', (socket) => {
        console.log('Khách hàng mới đã kết nối');

        socket.on('joinGroupAndGetSchedule', async (data) => {
            const { userId, doctorId, activateDay } = data;
            console.log(userId)
            if (!userId || !doctorId) {
                console.error('Thiếu userId hoặc doctorId');
                return;
            }
            const hasJoined = joinedGroups.has(`${userId}-${doctorId}`);
            if (hasJoined) {
                console.log("groups", groups)
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
            console.log(groups);
        });

        // socket.on('disconnect', () => {
        //     // Xóa userId của người dùng khỏi danh sách nhóm khi người dùng ngắt kết nối
        //     for (const group of groups) {
        //         const index = group.members.indexOf(userId.toString());
        //         if (index !== -1) {
        //             group.members.splice(index, 1);
        //             // Xóa khỏi danh sách nhóm đã tham gia
        //             joinedGroups.delete(`${userId}-${group.doctorId}`);
        //             break;
        //         }
        //     }
        // });

        // socket.on('selectSchedule', (data) => {
        //     const { userId, doctorId, scheduleId } = data;
        //     console.log(doctorId)
        //     console.log('first', scheduleId)
        //     // Tìm nhóm chứa người dùng hiện tại
        //     const group = groups.find(group => group.doctorId == doctorId);
        //     console.log("group", group);
        //     if (group) {
        //         if (userId) {
        //             // Kiểm tra xem lịch đã được chọn chưa
        //             if (group.selectedScheduleId === scheduleId) {
        //                 socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi .' + userId });
        //                 console.log("Lịch khám này đã được chọn bởi người dùng khác." + userId)
        //             } else {
        //                 console.log("2scheduleSelected")
        //                 // Thêm người dùng vào nhóm và gửi thông báo cho những người dùng trong nhóm
        //                 group.members.forEach(memberUserId => {
        //                     console.log(memberUserId)
        //                     io.to(memberUserId).emit('scheduleSelected', { success: true, message: 'Lịch khám đã được chọn thành công.' });
        //                 });
        //                 // Cập nhật lịch đã chọn
        //                 group.selectedScheduleId = scheduleId;
        //             }
        //             // }
        //         }
        //     }

        // });


        // socket.on('selectSchedule', (data) => {
        //     const { userId, doctorId, scheduleId } = data;

        //     // Tìm nhóm chứa người dùng hiện tại
        //     const group = groups.find(group => group.doctorId == doctorId);

        //     if (group) {
        //         if (userId) {
        //             // Kiểm tra xem lịch đã được chọn chưa
        //             if (group.selectedScheduleId === scheduleId) {
        //                 socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi ' + userId });
        //                 console.log("Lịch khám này đã được chọn bởi người dùng khác." + userId)
        //             } else {
        //                 // Kiểm tra xem lịch đã được chọn bởi người dùng khác chưa
        //                 const scheduleAlreadySelected = Object.values(group.members).some(member => member.scheduleId === scheduleId);
        //                 if (scheduleAlreadySelected) {
        //                     socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi người dùng khác.' });
        //                     console.log("Lịch khám này đã được chọn bởi người dùng khác.")
        //                 } else {
        //                     // Loại bỏ lịch cũ nếu có
        //                     if (group.selectedScheduleId) {
        //                         const index = group.members.findIndex(member => member.scheduleId === group.selectedScheduleId);
        //                         if (index !== -1) {
        //                             group.members.splice(index, 1);
        //                         }
        //                     }
        //                     // Thêm người dùng vào nhóm và gửi thông báo cho những người dùng trong nhóm
        //                     group.members.push({ userId, scheduleId });
        //                     group.members.forEach(member => {
        //                         console.log(member.userId)
        //                         socket.to(member.userId).emit('scheduleSelected', { success: true, message: 'Lịch khám đã được chọn thành công.' });
        //                     });
        //                     // Cập nhật lịch đã chọn
        //                     group.selectedScheduleId = scheduleId;
        //                 }
        //             }
        //         }
        //     }
        // });


        socket.on('selectSchedule', (data) => {
            const { userId, doctorId, scheduleId } = data;

            // Tìm nhóm chứa người dùng hiện tại
            const group = groups.find(group => group.doctorId == doctorId);

            if (group) {
                if (userId) {
                    // Kiểm tra xem lịch đã được chọn chưa
                    if (group.selectedScheduleId === scheduleId) {
                        socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi ' + userId });
                        console.log("Lịch khám này đã được chọn bởi người dùng khác." + userId)
                    } else {
                        // Kiểm tra xem lịch đã được chọn bởi người dùng khác chưa
                        const scheduleAlreadySelected = Object.values(group.members).some(member => member.scheduleId === scheduleId);
                        if (scheduleAlreadySelected) {
                            socket.emit('scheduleSelected', { success: false, message: 'Lịch khám này đã được chọn bởi người dùng khác.' });
                            console.log("Lịch khám này đã được chọn bởi người dùng khác.")
                        } else {
                            // Loại bỏ lịch cũ nếu có
                            if (group.selectedScheduleId) {
                                const index = group.members.findIndex(member => member.scheduleId === group.selectedScheduleId);
                                if (index !== -1) {
                                    group.members.splice(index, 1);
                                }
                            }
                            // Thêm người dùng vào nhóm và gửi thông báo cho người dùng đó
                            group.members.push({ userId, scheduleId });
                            socket.emit('scheduleSelected', { success: true, message: 'Lịch khám đã được chọn thành công.' }); // Gửi thông báo cho người dùng đó
                            // Cập nhật lịch đã chọn
                            group.selectedScheduleId = scheduleId;
                        }
                    }
                }
            }
        });
    });
}
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