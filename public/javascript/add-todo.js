async function newFormHandler(event) {
    event.preventDefault();

    const type = document.querySelector('#todo-type').value;
    const title = document.querySelector('input[name="todo-title"]').value;
    const contents = document.querySelector('input[name="todo-contents"]').value;

    const response = await fetch(`/api/todo`, {
        method: 'POST',
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
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

function textChange() {
    var selectValue = document.querySelector("#todo-type").value;
    if (selectValue === 'present') {
        document.querySelector('#todo-title-label').innerHTML = "Who is this present for?";
        document.querySelector('#todo-contents-label').innerHTML = "Present Details:";
    } else if (selectValue === 'event') {
        document.querySelector('#todo-title-label').innerHTML = "When is the Event?";
        document.querySelector('#todo-contents-label').innerHTML = "Event Details:";
    } else if (selectValue === 'general') {
        document.querySelector('#todo-title-label').innerHTML = "Title";
        document.querySelector('#todo-contents-label').innerHTML = "Contents";
    }
}

document.querySelector('#todo-type').addEventListener('change', textChange);
document.querySelector('.new-todo-form').addEventListener('submit', newFormHandler);