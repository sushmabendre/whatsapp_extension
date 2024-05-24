function filterChats(filterType) {
    const chats = document.querySelectorAll('.chat'); // Adjust selector as per WhatsApp Web's DOM
    chats.forEach(chat => {
      chat.style.display = 'none'; // Hide all chats initially
  
      if (filterType === 'all') {
        chat.style.display = ''; // Show all chats
      } else if (filterType === 'unread' && chat.classList.contains('unread')) {
        chat.style.display = ''; // Show only unread chats
      }
      // Add more conditions for other filters...
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'filterChats') {
      filterChats(request.filterType);
      sendResponse({ status: 'completed' });
    }
  });
  