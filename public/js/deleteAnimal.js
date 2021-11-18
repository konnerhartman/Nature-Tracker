// async function deleteFormHandler(event) {
//     event.preventDefault();

//     const id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//       ];
      
//       const response = await fetch(`/api/animals/${id}`, {
//         method: 'DELETE',
//         body: JSON.stringify({
//           post_id: id
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.ok) {
//         document.location.replace('/dashboard/');
//       } else {
//         alert(response.statusText);
//       }
      
// }

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


document.querySelector('.animal-list').addEventListener('click', delButtonHandler);