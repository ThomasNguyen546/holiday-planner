async function editFormHandler(event) {
    event.preventDefault();

    const type = document.querySelector('input[name="todo-type"]').value.trim();
    const title = document.querySelector('input[name="todo-title"]').value.trim();
    const contents = document.querySelector('input[name="todo-contents"]').value.trim();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            type,
            title,
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.btn-edit').addEventListener('submit', editFormHandler);