async function handleFormSubmission(event) {
    event.preventDefault();
    
    const phoneNumbersText = document.getElementById('phoneNumbers').value;
    const message = document.getElementById('message').value;
    
    const phoneNumbers = phoneNumbersText
        .split('\n')
        .map(num => num.trim())
        .filter(num => num);
    
    try {
        const response = await fetch('/api/sms/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumbers, message }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            notificationManager.show('SMS sent successfully!', 'success');
            loadHistory();
            event.target.reset();
        } else {
            notificationManager.show(`Error: ${data.error}`);
        }
    } catch (error) {
        notificationManager.show('Failed to send SMS');
        console.error('Error:', error);
    }
}