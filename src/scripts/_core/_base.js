function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function capitalizeFirstLetter(string) {
    let str = string.charAt(0).toUpperCase() + string.slice(1);
    return str.replace('_', ' ');
  }
function queryAll(showItems = '',page = '',color = '',type = '',rating = '',price = '') {
    return '?showItems='+showItems+'&page='+page+'&color='+color+'&type='+type+'&rating='+rating+'&price='+price+'';
}