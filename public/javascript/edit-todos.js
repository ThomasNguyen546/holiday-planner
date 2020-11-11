function editTodo() {

    const title = $(this).parents(".todo").find(".item-title");
    const contents = $(this).parents(".todo").find(".item-contents");

    const titleText = $(title).html();
    const contentsText = $(contents).html();

    const textInputTitle = $('<textarea>')
    .addClass("item-title")
    .val(titleText);

    const textInputContents = $('<textarea>')
    .addClass("item-contents")
    .val(contentsText);

    $(title).replaceWith(textInputTitle);
    $(contents).replaceWith(textInputContents);

}

$('.btn-edit').click(editTodo);