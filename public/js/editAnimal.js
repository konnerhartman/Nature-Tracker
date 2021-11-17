async function editFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="animal-name"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const location = document.querySelector('input[name="location"]').value;

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/animals/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          animal_id: id,
          name,
          description,
          location
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);