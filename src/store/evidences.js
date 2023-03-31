export default {
    state: () => ({
        evidences: [],
        evidencesTypes: [],
    }),
    getters: {
        evidenceRows(state) {
            return state.evidences;
        },
        evidenceTypes(state) {
          return state.evidencesTypes;
        },
    },
}