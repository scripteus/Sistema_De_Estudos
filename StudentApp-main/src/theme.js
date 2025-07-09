const btnTheme = document.getElementById('btn-theme');
let tema = 'claro'


btnTheme.addEventListener('click', () => {
    const themeController = document.querySelector('span');
    
    if (tema === 'claro') {
        tema = 'escuro';
        btnTheme.innerHTML = '<i class="fa-solid fa-sun"></i>';
        temaEscuro();
    } else {
        tema = 'claro';
        btnTheme.innerHTML = '<i class="fa-solid fa-moon"></i>';
        temaClaro();
    }

    themeController.id = tema;
});

btnTheme.addEventListener('click', () => {
  tema = tema === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', tema);
});