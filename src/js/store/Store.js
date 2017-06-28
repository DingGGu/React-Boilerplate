/**
 * Created by DingGGu <ggu@move.is> on 2017. 6. 28..
 */
import {ReduceStore} from "flux/utils";
import Dispatcher from "../Dispatcher";
import Immutable from "immutable";

class Store extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        return state;
    }
}

export default new Store();