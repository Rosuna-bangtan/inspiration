window.onload = function () {
    const editButtons = document.querySelectorAll('.edit_content_button');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // 1. get parentElement
            const parentElement = event.currentTarget.parentElement;
            const text = parentElement.querySelector('.content_text').innerText;

            // 2. convert the <p> into an <input>
            const inputElement = document.createElement('input');
            inputElement.value = text;

            parentElement.appendChild(inputElement);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';

            const id = parentElement.getAttribute('data-id');
            saveButton.addEventListener('click', async () => {
                const body = JSON.stringify({
                    content: inputElement.value,
                })

                const response = await fetch("/posts/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: body,
                });
            })


            parentElement.appendChild(saveButton)
        })
    })

    const deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const response = await fetch("/posts/" + id, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            });

            // refresh the page so user can see the latest updates
            location.reload();
        })
    })

    const newPostForm = document.getElementById('new_post_form');
    newPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('submitting new post');
        const body = JSON.stringify({
            title: document.getElementById('title_field').value,
            quote: document.getElementById('quote_field').value,
           
        })
        console.log(body);
        const response = await fetch("/posts", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });

        // refresh the page so user can see the latest updates
        location.reload();
    });

    const searchForm = document.getElementById('search_form');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchField = document.getElementById('search_field');
        const value = searchField.value;
        
        const response = await fetch('/posts?search=' + value);
        const posts = await response.json();
        console.log(posts);

        // clear out the #posts container
        // write javascript to create new post elements with the json ^
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const quoteButton = document.getElementById("quoteButton");
    const quoteDisplay = document.getElementById("quoteDisplay");

    // An array of quotes
    const quotes = [
        "The flower that blooms in adversity is the most rare and beautiful of all. – Mulan",
      "Hakuna Matata! It means no worries for the rest of your days.– The Lion King",
      "The past can hurt. But the way I see it, you can either run from it, or learn from it. – The Lion King",
      "A dream is a wish your heart makes. – Cinderella",
      "You control your destiny – you don’t need magic to do it. – Brave",
      "Some people are worth melting for. – Frozen",
      "Love is an open door. – Frozen",
      "Have courage and be kind. – Cinderella",
      "Who says that my dreams have to stay just my dreams? – The Little Mermaid",
    ];

    // Function to get a random quote
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.innerText = quotes[randomIndex];
    }

    // Event listener for the button
    quoteButton.addEventListener("click", getRandomQuote);
});