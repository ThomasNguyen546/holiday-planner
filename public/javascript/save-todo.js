async function saveFormHandler(event) {
    event.preventDefault();

    const title = $(this).parents(".todo").find(".item-title");
    const contents = $(this).parents(".todo").find(".item-contents");
    const type = $(this).parents(".todo").find(".item-type");

    const titleText = $(title).val();
    const contentsText = $(contents).val();

    const textInputTitle = $('<span>')
    .addClass("item-title")
    .html(titleText);

    const textInputContents = $('<span>')
    .addClass("item-contents")
    .html(contentsText);

    $(title).replaceWith(textInputTitle);
    $(contents).replaceWith(textInputContents);

    const id = $(this).parents(".todo").find(".todo-id").html();

    
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

$('.btn-save').click(saveFormHandler);