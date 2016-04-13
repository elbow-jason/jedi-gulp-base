import { createStore }  from 'redux';
import rootReducer      from './reducers';


const store = createStore(rootReducer);

window.journeyStore = store;

export default store;
