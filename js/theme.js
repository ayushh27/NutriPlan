let isDark = localStorage.getItem('isDark') === 'true';
const themeSwitch = document.querySelector('.right-nav input');
let checkbox = document.getElementById('checkbox');

// Set the initial theme based on the stored preference
checkbox.checked = isDark;
themeSwitcher();

// Function to toggle the theme
function themeSwitcher() {
    if (isDark) {
        document.querySelector('.logo img').src = './images/logo2.svg';
        document.body.classList.add('darktheme');
    } else {
        document.querySelector('.logo img').src = './images/logo1.svg';
        document.body.classList.remove('darktheme');
    }
}

// Event listener for the theme switch
themeSwitch.addEventListener('click', function () {
    isDark = !isDark;
    localStorage.setItem('isDark', isDark);
    themeSwitcher();
});

// Listen for changes in localStorage from other tabs
window.addEventListener('storage', function (event) {
    if (event.key === 'isDark') {
        isDark = event.newValue === 'true';
        checkbox.checked = isDark;
        themeSwitcher();
    }
});
