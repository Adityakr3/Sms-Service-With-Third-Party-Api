class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50';
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'error') {
        const id = 'notification-' + Date.now();
        const notification = document.createElement('div');
        notification.id = id;
        notification.className = `
            ${type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}
            border-l-4 p-4 mb-4 rounded shadow-lg transform transition-all duration-300 ease-in-out
        `;
        
        notification.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-grow">${message}</div>
                <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="notificationManager.close('${id}')">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;

        this.container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('translate-x-0');
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto close after 35 seconds
        setTimeout(() => {
            this.close(id);
        }, 2500);

        return id;
    }

    close(id) {
        const notification = document.getElementById(id);
        if (notification) {
            notification.classList.add('translate-x-full');
            notification.classList.add('opacity-0');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }
}

// Create global instance
window.notificationManager = new NotificationManager();