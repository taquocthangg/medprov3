import * as XLSX from 'xlsx';

const exportToExcel = (data, fileName) => {
    // Chuyển đổi dữ liệu từ JSON thành một mảng các hàng của bảng Excel
    const excelData = data.map(item => ({
        'Tên bệnh nhân': item.User ? item.User.name : '', // Kiểm tra nếu tồn tại User thì lấy tên, ngược lại để trống
        'Năm sinh': item.User ? item.User.namSinh : '', // Kiểm tra nếu tồn tại User thì lấy năm sinh, ngược lại để trống
        'Giới tính': item.User ? item.User.gioiTinh : '', // Kiểm tra nếu tồn tại User thì lấy giới tính, ngược lại để trống
        'Số điện thoại': item.User ? item.User.sdt : '', // Kiểm tra nếu tồn tại User thì lấy số điện thoại, ngược lại để trống
        'Địa chỉ': item.User ? item.User.diaChi : '', // Kiểm tra nếu tồn tại User thì lấy địa chỉ, ngược lại để trống
        'Thời gian khám': item.timeSlot,
        'Ngày khám': item.activateDay,
        'Giá': item.price,
    }));

    // Tạo một worksheet từ dữ liệu Excel
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Tạo một workbook và thêm worksheet vào đó
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Xuất tệp Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
export default exportToExcel;
// // Sử dụng hàm exportToExcel để xuất dữ liệu
// exportToExcel(data, 'example');