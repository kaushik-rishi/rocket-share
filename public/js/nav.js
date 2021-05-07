const navBar =  document.querySelector('.navbar');
const toggler = document.querySelector('.toggle');

const deleteBtn = document.querySelectorAll('.delete');

toggler.addEventListener('click', () => {
	navBar.classList.toggle('block');
})


//  Delete feature
deleteBtn.forEach(btn => {
	btn.addEventListener('click', (e) => {
		// console.log(e.target.getAttribute('data-id'));
		// console.log('Delete Button pressed!');
		const result = confirm('Do you really want to delte this?');
		if (result) {
			fetch(`${window.location.origin}/file/${e.target.getAttribute('data-id')}`, {
				method: 'DELETE'
			}).then(res => window.location.reload()).catch(err => {
				console.log(err.message);
			})
		}
	})
})