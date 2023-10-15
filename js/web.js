function web(bool) {
    let tabsContainer = qs('.tabsContainer');
    let title = id('title');
    let subtitle = id('subtitle');
    if (bool) {
        tabsContainer.style.display = 'none';

        let button = document.createElement('button');
        button.id = 'button';
        button.innerText = "立即開始";
        button.onclick = () => {web(false)};

        title.after(button);
    } else {
        if (id('button')) id('button').remove();
        tabsContainer.style.display = "block";
        title.classList.replace('title', 'title-new');
        subtitle.classList.replace('subtitle', 'subtitle-new');
        main();
    }
}