const createElement = function (type, classNames = [], content = '') {
    const element = document.createElement(type);
    element.classList.add(...classNames);
    element.textContent = content;
    return element;
};

const setSrcAlt = function (element, src = undefined, alt = '') {
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
};

export { createElement, setSrcAlt };
