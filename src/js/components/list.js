import Component from '../lib/component.js';
import store from '../store/index.js';

export default class List extends Component {
    
    constructor() {
        super({
            store,
            element: document.querySelector('.js-items')
        });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;

        // If there are no items to show, render motivational message!
        if(store.state.items.length === 0) {
            self.element.innerHTML = `<p class="no-items">🤔 Your list is empty! Go ahead and track your first to-do item with the input bar below.</p>`;
            return;
        }
        
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
            <ul class="app__items">
                ${store.state.items.sort().map(item => {
                    return `
                        <li>${item}<button aria-label="Delete this item">×</button></li>
                    `
                }).join('')}
            </ul>
        `;
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index });
            });
        });
    }
};
