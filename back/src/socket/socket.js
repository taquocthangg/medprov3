
function initialize(io) {
    const groups = [];
    const joinedGroups = new Set();
    io.on('connection', (socket) => {
        console.log('Khách hàng mới đã kết nối');

        socket.on('joinGroupAndGetSchedule', async (data) => {
            const { userId, doctorId, activateDay } = data;
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
        //     console.log('Khách hàng disconnect');

        //     // Lặp qua từng nhóm
        //     for (let i = groups.length - 1; i >= 0; i--) {
        //         const group = groups[i];
        //         if (group) { // Kiểm tra xem group có tồn tại không
        //             const index = group.members.findIndex(member => member.userId === socket.userId?.toString());
        //             if (index !== -1) {
        //                 const disconnectedUser = group.members.splice(index, 1)[0];
        //                 // Xóa khỏi danh sách nhóm đã tham gia
        //                 joinedGroups.delete(`${socket.userId}-${group.doctorId}`);
        //                 if (group.members.length === 0) {
        //                     // Nếu không còn thành viên nào trong nhóm, loại bỏ nhóm khỏi danh sách
        //                     delete group.selectedScheduleId;
        //                     groups.splice(i, 1);
        //                 } else if (disconnectedUser.scheduleId === group.selectedScheduleId) {
        //                     // Nếu người dùng disconnect và đang chọn schedule, bỏ chọn schedule đó
        //                     delete group.selectedScheduleId;
        //                 }
        //                 break;
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
        socket.on('cancelScheduleSelection', (data) => {
            const { userId, doctorId } = data;
            // Tìm nhóm chứa người dùng hiện tại
            const group = groups.find(group => group.doctorId == doctorId);
            console.log(group)
            if (group) {
                if (userId) {
                    // Kiểm tra xem người dùng có lựa chọn lịch khám không
                    if (group.selectedScheduleId) {
                        // Kiểm tra xem người dùng đang thực sự chọn lịch khám đó không
                        const isUserSelected = group.members.some(member => member.userId === userId && member.scheduleId === group.selectedScheduleId);
                        if (isUserSelected) {
                            // Xóa lựa chọn lịch khám của người dùng
                            const index = group.members.findIndex(member => member.userId === userId && member.scheduleId === group.selectedScheduleId);
                            group.members.splice(index, 1);
                            delete group.selectedScheduleId;
                            socket.emit('scheduleSelectionCancelled', { success: true, message: 'Đã hủy lựa chọn lịch khám.' });
                        } else {
                            socket.emit('scheduleSelectionCancelled', { success: false, message: 'Người dùng không có lựa chọn lịch khám.' });
                        }
                    } else {
                        socket.emit('scheduleSelectionCancelled', { success: false, message: 'Chưa có lịch khám được chọn.' });
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

