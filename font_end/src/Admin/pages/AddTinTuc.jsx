import React from 'react'
import MarkDown from '../../componnets/MarkDown/markDown'

export default function AddTinTuc() {
    return (
        <div>
            <input type="text" placeholder='Nhập tiêu đề...' />
            <h3 style={{ margin: 20 }}>
                Thêm nội dung bài viết
            </h3>
            <MarkDown />
        </div>
    )
}
