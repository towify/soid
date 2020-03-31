/*
 * @author kaysaith
 * @date 2020/3/11 15:56
 */
HTMLElement.prototype.addDomFragment = function (domFragment) {
    domFragment._beforeAttached().then(_ => {
        this.appendChild(domFragment.fragment);
    });
};
HTMLElement.prototype.addView = function (view) {
    view._prepareLifeCycle().then(_ => {
        this.appendChild(view._element);
    });
};
