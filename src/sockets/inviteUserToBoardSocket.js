/**
 * @param {*} socket from socket.io
 * */

export const inviteUserToBoardSocket = (socket) => {
    socket.on('c_user_invited_to_board', (invitation) => { // Lắng nghe sự kiện từ client có tên: c_user_invited_to_board
        // Emit ngược lại một sự kiện có tên là 's_user_invited_to_board' cho client ngoại trừ chính thằng gửi
        socket.broadcast.emit('s_user_invited_to_board', invitation)
    })
}