
///Globals
var x = {};

x.e = function (p_id) {
    return document.getElementById(p_id);
};

x.GetMainSection = function (p_id) {
    return '<section class="MainSection" id = "' + p_id + '"></section>';
};

x.GetHeading = function (pText, optionalAlign) {
    optionalAlign = optionalAlign || 'left';
    var padding = x.rf(0.3) + ' ' + x.rf(0.2) + ' ' + x.rf(0.3) + ' ' + x.rf(0.4);
    return '<div >' + pText + '</div>';
};

x.GetButton = function (pText, pOnClick, optional_id) {
    var id = '';
    if (optional_id) {
        id = 'id = "' + optional_id + '"';
    }
    return '<button ' + id + ' onclick = "' + pOnClick + '" >' + pText + '</button>';
};


x.Show = function (pScreen) {
    pScreen.div.style.display = 'inline-block';
    scrollTo(0, pScreen.pageYOffset || 0);
};

x.ShowElement = function (p_id) {
    var e = x.e(p_id);
    e.style.display = 'inline-block';
};

x.Hide = function (p_id) {
    var e = x.e(p_id);
    e.style.display = 'none';
};

x.Level = parseInt(localStorage.Level) || 1;
x.Nuggets = parseInt(localStorage.Nuggets) || 0;