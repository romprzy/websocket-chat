// Make connection
const socket = io.connect('http://localhost:4000');
// console.log(socket);

const chatInit = () => {
  const chat = document.getElementById('chat');
  const output = chat.querySelector('.chat-output');
  const feedback = chat.querySelector('.chat-feedback');
  const form = document.forms.chat;
  const name = form.name;
  const message = form.message;
  // console.log(chat);
  // console.log(form);

  // Emit events
  form.onsubmit = () => {
    // e.preventDefault();
    socket.emit('chat', {
      name: name.value,
      message: message.value
    });
    message.value = '';
    return false;
  };

  message.addEventListener('keypress', () => {
    socket.emit('typing', {
      name: name.value
    })
  })

  // Listen for events
  socket.on('chat', data => {
    output.innerHTML += `<p><strong class="name">${data.name}</strong> ${data.message}</p>`;
    feedback.innerHTML = '';
  });

  socket.on('typing', data => {
    feedback.innerHTML = `<p><em>${data.name} is typing a message</em></p>`;
  });
}

window.onload = () => {
  chatInit();
}