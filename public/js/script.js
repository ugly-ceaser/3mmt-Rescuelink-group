document.getElementById('sendReport').addEventListener('click', async function() {
    const formData = {
        responseType: document.getElementById('type').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    try {
        const response = await axios.post('/api/responses', formData);
        alert('Report sent successfully!');
        formData.reset();
    } catch (error) {
        console.error('Error sending report:', error);
        alert('Failed to send report. Please try again.');
    }
});

function openModal() {
  document.getElementById('contactsModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('contactsModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('contactsModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// When submitting a new report
async function submitReport(formData) {
    try {
        const response = await fetch('/api/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit report');
        }

        return await response.json();
    } catch (error) {
        console.error('Submission Error:', error);
        throw error;
    }
}

// When fetching reports
async function fetchReports() {
    try {
        const response = await fetch('/api/responses');
        if (!response.ok) {
            throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        return data.responses;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
}