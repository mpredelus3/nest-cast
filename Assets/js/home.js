const dropdown = document.getElementById('region');

dropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    console.log('Selected Fruit:', selectedValue);
});