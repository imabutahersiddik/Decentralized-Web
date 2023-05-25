function encrypt() {
    var htmlCode = document.getElementById('html-code').value;
    var htmlCode = document.getElementById('note-title').value;
    var encrypted = CryptoJS.AES.encrypt(htmlCode, "ALLAH");

    // Displaying encrypted URL to user
    var url = window.location.origin + window.location.pathname + '?encrypted-html=' + encodeURIComponent(encrypted);
    document.getElementById('encrypted-url').innerHTML = '<p>Your Decentrealized Web URL:</p><pre>' + url + '</pre>';

    // Clear existing HTML from decrypted-html div
    document.getElementById('man-creator-is-one-he-is-allah').innerHTML = '';
    document.getElementById('note-title').innerHTML = '';

    // Append a div element to the decrypted-html div
    var div = document.createElement('div');
    div.innerHTML = htmlCode;
    document.getElementById('man-creator-is-one-he-is-allah').appendChild(div);
    var div = document.createElement('div');
    div.innerHTML = noteTitle;
    document.getElementById('note-title').appendChild(div);

    // Hide the form fields
    document.getElementById('html-code').style.display = 'none';
    document.querySelector('form button:first-of-type').style.display = 'none';
    document.querySelector('form button:last-of-type').style.display = 'inline-block';

    // Update the URL with the encrypted HTML using the pushState method
    if (history.pushState) {
        var newUrl = url;
        window.history.pushState({path: newUrl}, '', newUrl);
    }
}

function decrypt() {
    var path = window.location.pathname;
    var pathParts = path.split('/');

    if (pathParts[1] === 'site' && pathParts[2]) {
        var encryptedHtml = decodeURIComponent(pathParts[2]);
        var decrypted = CryptoJS.AES.decrypt(encryptedHtml, "ALLAH");
        var html = decrypted.toString(CryptoJS.enc.Utf8);
        document.getElementById('man-creator-is-one-he-is-allah').innerHTML = html;
        var html = decrypted.toString(CryptoJS.enc.Utf8);
        document.getElementById('note-title').innerHTML = html;

        // Hide the form fields
        document.getElementById('html-code').style.display = 'none';
        document.querySelector('form button:first-of-type').style.display = 'none';
        document.querySelector('form button:last-of-type').style.display = 'none';
    } else {
        // Show the form fields
        document.getElementById('html-code').style.display = 'block';
        document.querySelector('form button:first-of-type').style.display = 'inline-block';
               document.querySelector('form button:last-of-type').style.display = 'none';
    }
}

function copyURL() {
    var encryptedURL = document.getElementById('encrypted-url').getElementsByTagName('pre')[0].textContent;
    navigator.clipboard.writeText(encryptedURL);
    alert('URL copied to clipboard!');
}

// Call the decrypt function on page load
decrypt();

// Hide the form fields if data is available in the URL
var pathParts = window.location.pathname.split('/');
if (pathParts[1] === 'site' && pathParts[2]) {
    document.getElementById('html-code').style.display = 'none';
    document.querySelector('form button:first-of-type').style.display = 'none';
    document.querySelector('form button:last-of-type').style.display = 'none';
} else {
    document.querySelector('form button:first-of-type').style.display = 'inline-block';
}