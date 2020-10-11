const like = document.querySelector('.like');
const likesNumber = document.querySelector('.likes-number');
const commentForm = document.querySelector('.comment-form');
const commentList = document.querySelector('.comment-list');
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const message = document.querySelector('#message');
const button = document.querySelector('.button');
const backChannelingForm = document.querySelector('.back-channeling-form');
const postsFilters = document.querySelector('.posts-filters');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const modalButton = document.querySelector('#modal-button');

const toggleModal = () => {
  modal.classList.toggle('is-open');
}

const changeLike = () => {
  if (like.classList.contains('added')) {
    like.style.backgroundImage = "url('./img/like.svg')";
    likesNumber.textContent--;
  } else {
    likesNumber.textContent++;
    like.style.backgroundImage = "url('./img/like_fill.svg')";
  }
  like.classList.toggle('added');
};
const clearFields = () => {
  userName.value = '';
  message.value = '';
  userEmail.value = '';
  button.disabled = true;
  button.classList.add('nohover');
  message.classList.add('warning');
};

const createNewComment = () => {
  commentList.insertAdjacentHTML('afterbegin', `
    <li class="comment-user">
      <div class="comment-user-wrapper">
        <img
          src="./img/nophoto.jpg"
          alt="фото ${userName.value}"
          class="user-avatar"
        />
        <p class="comment-user-name">${userName.value}</p>
      </div>
      <p class="comment-user-text">
        ${message.value}
      </p>
    </li>
  `);
  clearFields();
};

const renderNews = () => {
  const newsArticles = document.querySelectorAll('.news-article');
  newsArticles.forEach(e => {
    console.log('filter: ' + postsFilters.value, ' teg: '+ e.dataset.category);
      if (postsFilters.value === 'all' || e.dataset.category === postsFilters.value) {
        e.dataset.visible = 'visible'
      } else {
        e.dataset.visible = 'hidden'
      }

  })
}


message.addEventListener('input', () => {
  const charCounter = message.value.length;
  if (charCounter > 9 && charCounter < 201) {
    button.disabled = false;
    button.classList.remove('nohover');
    message.classList.remove('warning');
  } else {
    button.disabled = true;
    button.classList.add('nohover');
    message.classList.add('warning');
  }
});
// })

if (like) {
  like.addEventListener('click', changeLike);
}

if (commentForm) {
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    createNewComment();
    toggleModal();
  });
}

if (backChannelingForm) {
  backChannelingForm.addEventListener('submit', e => {
    e.preventDefault();
    toggleModal();
    clearFields();
  })
}

if (postsFilters) {
  postsFilters.addEventListener('change', renderNews);
}

close.addEventListener('click', toggleModal);
modalButton.addEventListener('click', toggleModal);