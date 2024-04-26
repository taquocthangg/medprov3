import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { addNews, uploadImage } from '../../pages/api';
import io from 'socket.io-client';

// Khởi tạo parser Markdown
const mdParser = new MarkdownIt(/* Markdown-it options */);
// Hàm xử lý khi nội dung thay đổi

const MarkDown = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        const socket = io('http://localhost:5000'); // Điều chỉnh URL máy chủ nếu cần thiết

        // Xử lý sự kiện khi kết nối thành công
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // Xử lý sự kiện khi nhận được thông báo mới từ máy chủ
        socket.on('newNewsAdded', (data) => {
            console.log('New comment notification:', data);
            // Thực hiện các thao tác cần thiết khi nhận được thông báo mới
        });

        // Đảm bảo rằng bạn ngừng lắng nghe khi component unmount
        return () => {
            socket.disconnect();
        };
    }, []);
    function handleEditorChange({ html, text }) {
        sethtmlContent(html)
        setmarkDownContent(text)
        console.log('html', html);
        console.log('text', text);
    }
    const [htmlContent, sethtmlContent] = useState('');
    const [markDownContent, setmarkDownContent] = useState('');
    const [image, setimage] = useState('https://res.cloudinary.com/dw9w3kc49/image/upload/v1710429326/user/qwpelhpnb6ojj6eortq7.png');
    const [title, settitle] = useState('Tin tức này test thôi :v');
    // Hàm xử lý tải ảnh lên và nhận về link
    const handleImageUpload = async (file, callback) => {
        try {
            console.log('first')
            console.log(file)
            const imageUrl = await uploadImage(file);
            callback(imageUrl);
            console.log(imageUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const postToApi = async () => {
        const postData = {
            htmlContent: htmlContent,
            markDownContent: markDownContent,
            image: image,
            title: title
        };

        try {
            addNews(postData)
        } catch (error) {
            console.error('Error posting to API:', error);
        }
    };

    return (
        <>
            <MdEditor
                style={{ height: '500px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                onImageUpload={handleImageUpload}
            />
            <button onClick={postToApi}>
                Đăng bài
            </button>
            {message && <p>{message}</p>}

        </>
    );
};

export default MarkDown;
