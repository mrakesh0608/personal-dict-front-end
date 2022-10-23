let isDark = false;

const ToggleDarkTheme = () => {
    console.log('Theme Changed');

    if (isDark) {
        document.documentElement.style.setProperty('--bgColor', 'white');
        document.documentElement.style.setProperty('--textColor', 'black');
        document.documentElement.style.setProperty('--bgLightColor', 'gainsboro');
        document.documentElement.style.setProperty('--invertStrength', '0');
        isDark = false;
        localStorage.removeItem('Dark-Theme');
    }
    else {
        document.documentElement.style.setProperty('--bgColor', 'black');
        document.documentElement.style.setProperty('--textColor', 'white');
        document.documentElement.style.setProperty('--bgLightColor', 'gray');
        document.documentElement.style.setProperty('--invertStrength', '100%');
        isDark = true;
        localStorage.setItem('Dark-Theme', true);
    }
}
export default ToggleDarkTheme;