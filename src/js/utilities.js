const createElement = function (type, className = '', content = '') {
    const element = document.createElement(type);
    element.classList.add(className);
    element.textContent = content;
    return element;
};

const setSrcAlt = function (element, src = undefined, alt = '') {
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
};

export { createElement, setSrcAlt };
