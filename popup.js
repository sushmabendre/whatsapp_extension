document.getElementById('allChats').addEventListener('click', () => {
  executeFilter('all');
});

document.getElementById('unreadChats').addEventListener('click', () => {
  executeFilter('unread');
});

document.getElementById('awaitingReply').addEventListener('click', () => {
  executeFilter('awaitingReply');
});

document.getElementById('needsReply').addEventListener('click', () => {
  executeFilter('needsReply');
});

document.getElementById('leadChats').addEventListener('click', () => {
  executeFilter('lead');
});

document.getElementById('friendChats').addEventListener('click', () => {
  executeFilter('friend');
});

document.getElementById('businessChats').addEventListener('click', () => {
  executeFilter('business');
});

function executeFilter(filterType) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error('No active tabs found.');
      return;
    }
    
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: filterChats,
      args: [filterType]
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error('Script injection failed: ', chrome.runtime.lastError.message);
      } else {
        console.log('Filter applied: ', filterType);
      }
    });
  });
}

function filterChats(filterType) {
  console.log(`Applying filter: ${filterType}`);
  // Here you need to implement the logic to filter chats on WhatsApp Web
  // This is a placeholder function
  // You might need to select chat elements based on the class names and filter them accordingly

  const chatList = document.querySelectorAll('.chat'); // Adjust this selector based on WhatsApp's DOM
  chatList.forEach(chat => {
    chat.style.display = 'none'; // Hide all chats initially

    if (filterType === 'all') {
      chat.style.display = ''; // Show all chats
    } else if (filterType === 'unread' && chat.classList.contains('unread')) {
      chat.style.display = ''; // Show only unread chats
    } else if (filterType === 'awaitingReply' && chat.classList.contains('awaiting-reply')) {
      chat.style.display = ''; // Show only awaiting reply chats
    } else if (filterType === 'needsReply' && chat.classList.contains('needs-reply')) {
      chat.style.display = ''; // Show only needs reply chats
    } else if (filterType === 'lead' && chat.classList.contains('lead')) {
      chat.style.display = ''; // Show only lead chats
    } else if (filterType === 'friend' && chat.classList.contains('friend')) {
      chat.style.display = ''; // Show only friend chats
    } else if (filterType === 'business' && chat.classList.contains('business')) {
      chat.style.display = ''; // Show only business chats
    }
  });
}
