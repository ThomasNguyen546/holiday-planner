async function deleteFormHandler(event) {
    event.preventDefault();

    const id = $(this).parents(".todo").find(".todo-id").html();

    const response = await fetch(`/api/todo/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

$('.btn-delete').click(deleteFormHandler);