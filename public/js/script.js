document.getElementById('sendReport').addEventListener('click', async (e) => {
    e.preventDefault();
    
    // Get form values and ensure they're properly trimmed
    const formData = {
        responseType: document.getElementById('type').value.trim().toLowerCase(),
        description: document.getElementById('description').value.trim(),
        location: document.getElementById('location').value.trim()
    };
    
    // Debug log to verify data
    console.log('Form Data:', formData);
    
    // Validate all fields
    if (!formData.responseType || !formData.description || !formData.location) {
        alert('Please fill in all required fields');
        return;
    }
    
    try {
        const response = await fetch('/api/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                responseType: formData.responseType,
                description: formData.description,
                location: formData.location  // Make sure this is being sent
            })
        });

        // Debug log to verify response
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit report');
        }

        const data = await response.json();
        console.log('Success response:', data);
        alert('Report submitted successfully!');
        
        // Clear form
        document.getElementById('type').value = 'fire';
        document.getElementById('description').value = '';
        document.getElementById('location').value = '';
        
    } catch (error) {
        console.error('Submission Error:', error);
        alert('Error submitting report: ' + error.message);
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