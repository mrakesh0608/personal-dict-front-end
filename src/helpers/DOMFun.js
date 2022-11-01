const labelFocus = () => {
    const label = document.getElementsByClassName('form-label');
    Array.from(label).forEach(element => {
        element.addEventListener('click', (e) => {
            element.previousElementSibling.focus();
        });
    });
}

export { labelFocus }