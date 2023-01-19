"use strict";

(() => {
    const fuse = new window.Fuse(window.moveModel, {
        isCaseSensitive: true,
        shouldSort: true,
        findAllMatches: true,
        ignoreLocation: true,
        keys: ['d']
    });

    let timer = null;
    function onInput(event) {
        clearTimeout(timer);
        const value = event.target.value;
        if (value === "") {
            hideAlternative();
        } else {
            timer = setTimeout(search.bind(this, value), 400);
        }
    }

    const mainElement = document.getElementById('main-content');
    const alternativeElement = document.getElementById('alternative-display');
    const resultElement = document.getElementById('search-results');
    
    const inputElement = document.getElementById('search-input');
    inputElement.addEventListener('input', onInput, false);

    function search(pattern) {
        clearResults();

        const result = fuse.search(pattern);
        const len = Math.min(result.length, 64);
        for (let i = 0; i < len; i++) {
            const row = result[i].item;

            const rowElement = document.createElement('a');
            rowElement.setAttribute('href', row.l);
            resultElement.appendChild(rowElement);

            const definitionElement = document.createElement('div');
            definitionElement.classList.add('definition');
            rowElement.appendChild(definitionElement);
        
            const codeElement = document.createElement('code');
            codeElement.innerHTML = row.f;
            definitionElement.appendChild(codeElement);

            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('description');
            descriptionElement.innerHTML = row.de;
            rowElement.appendChild(descriptionElement);
        }

        mainElement.classList.add('hidden');
        alternativeElement.classList.remove('hidden');
    }

    function clearResults() {
        while (resultElement.firstChild) {
            resultElement.removeChild(resultElement.firstChild);
        }
    }

    function hideAlternative() {
        mainElement.classList.remove('hidden');
        alternativeElement.classList.add('hidden');
        clearResults();
    }
})()