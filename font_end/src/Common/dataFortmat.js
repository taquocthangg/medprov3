 const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // Đảm bảo không có phần thập phân
        maximumFractionDigits: 0,
    }).format(price).replace('$', '');

    return formattedPrice.endsWith('.00') ? formattedPrice.slice(0, -3) : formattedPrice;
};
const formatDate=(dateTimeString)=>{
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const formatDateNoHours=(dateTimeString)=>{
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();   
    return `${year}-${month}-${day} `;
}

const formatVietnameseToString = (keyword) => {
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
}
export {
    formatPrice,formatDate,formatVietnameseToString,formatDateNoHours
}