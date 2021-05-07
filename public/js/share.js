// UI Elements
const dropZone = document.querySelector('.drop-zone'),
	browseBtn = document.querySelector('span.browseBtn'),
	fileInput = document.querySelector('input#fileupload'),
	progressContainer = document.querySelector('.progress-container'),
	bgProgress = document.querySelector('.bg-progress'),
	percent = document.querySelector('.inner-container #percent'),
	uploadStatus = document.querySelector('.inner-container .title'),
	progressBar = document.querySelector('.progress-bar'),
	linkContainer = document.querySelector('.link-container'),
	copyBtn = document.querySelector('img.copy-icon'),
	urlInput = document.querySelector('.input-container input'),
	mailForm = document.querySelector('#mail-form'),
	mailFormBtn = document.querySelector('#mail-form button'),
	toast = document.querySelector('.toast'),
	menuBtn = document.querySelector('.menu-toggle'),
	leftNav = document.querySelector('.left-nav');

const uploadHost = '/api/file';
const mailHost = '/api/mail';

// to redirect the click of the span to the click of the input[type='file'] box
browseBtn.addEventListener('click', function(e) {
	fileInput.click();
});

// to add the class dragged when something is dragged over the dragzone which will trigger animation
dropZone.addEventListener('dragover', function(e) {
	e.preventDefault();
	if (!dropZone.classList.contains('dragged')) dropZone.classList.add('dragged');
});

// remove the animation when the drag is left
// this fucks up the animation
// dropZone.addEventListener('dragleave', function(e) {
	// dropZone.classList.remove('dragged');
// });

dropZone.addEventListener('drop', function(e) {
	e.preventDefault();
	dropZone.classList.remove('dragged');

	const files = e.dataTransfer.files;
	// attaching the dropped file to the fileInput list
	// TODO : single file system hamara

	if (files.length) {
		fileInput.files = files;
		upload();
	} else {
		// if something else is dropped [text/folder]
		showToast('Please drop files into the drop zone');
	}
});

// on selection upload the file
fileInput.addEventListener('change', upload);

// uploads the file to the server using XHR
function upload() {
	if (fileInput.files.length > 1) {
		fileInput.value = '';
		return showToast('Upload Only 1 file');
	}

	// make the progress bar visible when uploading is started
	progressContainer.classList.remove('hide');

	const file = fileInput.files[0];
	const formData = new FormData();
	console.log(file);
	formData.append('fileupload', file);
	console.log(formData);
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE)	{
			// url of the page to render /file/uuid
			const response = JSON.parse(xhr.response);
			if (response.ok === true) {
				console.log(response);
				onUploadSuccess(response);
				uploadStatus.innerText = 'Uploaded';
				setTimeout(() => {
					progressContainer.classList.add('hide');
				}, 1000);
			}
			else
				uploadStatus.innerText = response.msg;
		}
	}

	xhr.upload.onprogress = updateProgress;

	xhr.upload.onerror = () => {
		showToast(`😭 Error in uploading the file to the server`);
		fileInput.files = undefined;
	}

	xhr.open('POST', uploadHost);
	xhr.send(formData);
}

copyBtn.addEventListener('click', copyUrl);
urlInput.addEventListener('click', copyUrl);

function copyUrl(e) {
	if (urlInput.value.length === 0) return; // extra safety
	urlInput.select();
	document.execCommand('copy');
	showToast('🚀 Copied Link to Clipboard');
}

function updateProgress(event) {
	const fraction = event.loaded / event.total;
	const percentage = Math.round( fraction* 100);
	percent.innerText = String(percentage);
	bgProgress.style.transform = `scaleX(${fraction})`;
	progressBar.style.transform = `scaleX(${fraction})`;
}

function onUploadSuccess({url}) {
	linkContainer.classList.remove('hide');
	// mailForm[2].disabled = "false";
	// mailForm[2].style.cursor = "pointer";
	// mailForm[2].style.background = "#03a9f4";
	
	// TODO : backend, link is the url of the page that renders the file/:uuid	
	urlInput.value = url;
}

 mailFormBtn.addEventListener('click', (e) => {
 	e.preventDefault();

 	const data = JSON.stringify({
 			sender: mailForm.elements["sender"].value,
 			reciever: mailForm.elements["reciever"].value
 		});

 	// disable the mail form once the mail request is initiated

 	console.log(data);
 	fetch(mailHost, {
 		method: 'POST',
 		body: data,
 		headers: {
 			'Content-Type': 'application/json'
 		}
 	})
 		.then(response => {
	 		return response.json();
	 	}).then(json => {
	 		console.log(json);
	 		if (json.ok) {
			 	// TODO : actually do this if the email was success
			 	mailForm[0].setAttribute('readonly', 'true');
			 	mailForm[1].setAttribute('readonly', 'true');
			 	mailForm[2].setAttribute('disabled', 'true');
			 	mailForm[2].style.cursor = "not-allowed";
			 	mailForm[2].style.color = 'black';
			 	mailForm[2].style.background = '#ccc';

			 	showToast('👾 Mail Sent');
	 		}
	 		setTimeout(() => {
	 			linkContainer.classList.add('hide');
	 		}, 500);
	 	});
 });

 function showToast(message) {
 	toast.innerText = message;
 	toast.classList.add('toast-show');
 	setTimeout(() => {
 		toast.classList.remove('toast-show');
 	}, 1200);
 }

// menuBtn.addEventListener('click', (e) => {
// 	if (menuBtn.src.split('/').pop()==='menu-open.png') menuBtn.src = '/static/assets/menu-close.png';
// 	else if (menuBtn.src.split('/').pop()==='menu-close.png') menuBtn.src = '/static/assets/menu-open.png';
// 	leftNav.classList.toggle('hide');
// });