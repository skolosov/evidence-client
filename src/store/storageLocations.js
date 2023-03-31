export default {
    state: () => ({
        storageLocations: [],
        divisions: [],
    }),
    getters: {
        storageLocationsRows(state) {
            return state.storageLocations;
        },
        divisionsOptions(state) {
            return state.divisions;
        },
    },
}