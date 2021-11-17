async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="animal-name"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const location = document.querySelector('input[name="location"]').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        location,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);