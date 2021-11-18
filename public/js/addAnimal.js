const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const location = document.querySelector('#location').value.trim();

    if (name && description && location) {
    const response = await fetch(`/api/animals`, {
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
      alert('Fail to add');
    }
   }
  };
console.log(document.querySelector('form'));
document.querySelector('form').addEventListener('submit', newFormHandler);