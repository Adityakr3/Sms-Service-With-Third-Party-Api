document.getElementById('smsForm').addEventListener('submit', handleFormSubmission);

async function deleteMessage(id) {
    try {
        const response = await fetch(`/api/sms/message/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            notificationManager.show('Message deleted successfully', 'success');
            loadHistory();
        } else {
            const data = await response.json();
            notificationManager.show(`Error: ${data.error}`);
        }
    } catch (error) {
        notificationManager.show('Failed to delete message');
        console.error('Error:', error);
    }
}

async function deleteAllMessages() {
    if (!confirm('Are you sure you want to delete all messages?')) {
        return;
    }
    
    try {
        const response = await fetch('/api/sms/messages', {
            method: 'DELETE'
        });
        
        if (response.ok) {
            notificationManager.show('All messages deleted successfully', 'success');
            loadHistory();
        } else {
            const data = await response.json();
            notificationManager.show(`Error: ${data.error}`);
        }
    } catch (error) {
        notificationManager.show('Failed to delete all messages');
        console.error('Error:', error);
    }
}

async function loadHistory() {
    try {
        const response = await fetch('/api/sms/history');
        const messages = await response.json();
        
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = `
            <div class="flex justify-end mb-4">
                <button 
                    onclick="deleteAllMessages()"
                    class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Delete All
                </button>
            </div>
            ${messages.map(msg => `
                <div class="border-b border-gray-200 pb-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm text-gray-600">
                                Sent to ${msg.phoneNumbers.length} number(s)
                            </p>
                            <p class="mt-1">${msg.message}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 text-sm rounded-full ${
                                msg.status === 'sent' ? 'bg-green-100 text-green-800' : 
                                msg.status === 'failed' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                            }">
                                ${msg.status}
                            </span>
                            <button 
                                onclick="deleteMessage('${msg._id}')"
                                class="text-red-600 hover:text-red-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">
                        ${new Date(msg.sentAt).toLocaleString()}
                    </p>
                </div>
            `).join('')}`;
    } catch (error) {
        notificationManager.show('Error loading history');
        console.error('Error:', error);
    }
}
loadHistory();