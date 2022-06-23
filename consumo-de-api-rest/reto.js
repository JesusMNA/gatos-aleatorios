const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const cambiar = document.getElementById("cambiar");
const gatito1 = document.getElementById("gatito-1");
const gatito2 = document.getElementById("gatito-2");
const spanError = document.getElementById("error");
const section = document.getElementById('favouriteMichis');

async function loadRandomMichis() {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();

    if(response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status + " " + data.message;
    }
    else {
        const btn1 = document.getElementById('guardar1');
        const btn2 = document.getElementById('guardar2');

        gatito1.src = data[0].url;
        gatito2.src = data[1].url;
        btn1.onclick = () => saveFavouriteMichis(data[0].id)
        btn2.onclick = () => saveFavouriteMichis(data[1].id)
    }
}

async function loadFavouriteMichis() {
    const response = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': '0fa7699d-2475-4d07-b8ad-c568148cdebc'
        }
    });
    const data = await response.json();
    if(response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status + " " + data.message;
    }
    else {
        section.innerHTML = "";
        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Quitar de favoritos');

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteMichi(michi.id);
            img.src = michi.image.url;

            article.appendChild(btn);
            article.appendChild(img),

            section.appendChild(article);
        });
    }
}

async function saveFavouriteMichis(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '0fa7699d-2475-4d07-b8ad-c568148cdebc'
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
    }
    else {
        loadFavouriteMichis();
    }
}

async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': '0fa7699d-2475-4d07-b8ad-c568148cdebc'
        }
    })
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message;
    }
    else {
        loadFavouriteMichis();
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById("uploadingForm");
    const formData = FormData(form);

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': '0fa7699d-2475-4d07-b8ad-c568148cdebc'
        },
        body: formData
    })
}

cambiar.addEventListener('click', () => {
    loadRandomMichis();
})

loadRandomMichis();
loadFavouriteMichis();