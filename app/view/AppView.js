import Marionette from 'marionette';
import template from 'app/view/AppView.tpl.html!text'


export default class AppView extends Marionette.ItemView {
    constructor(...rest) {
    super(...rest);
        this.template = template;
}
};