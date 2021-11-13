const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#animal-name').value.trim();
  const description = document.querySelector('#animal-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/animals`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new animal');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/animals/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete animal');
    }
  }
};

document
  .querySelector('.new-animal-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.animal-list')
  .addEventListener('click', delButtonHandler);
