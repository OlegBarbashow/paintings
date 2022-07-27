const drop = () => {
    const fileInputs = document.querySelectorAll('[name = "upload"]');
    ['dragenter', 'dragover', 'drop', 'dragleave'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    let startInputColor = '';

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, .7)';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = '';
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['drop', 'dragleave'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            let arrName = input.files[0].name.split('.');
            arrName[0].length > 6 ? dots = '...' : dots = '.';
            const name = arrName[0].substring(0, 6) + dots + arrName[1];
            input.previousElementSibling.textContent = name;
        });
    });
















}

export default drop;