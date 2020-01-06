export const criarEncomenda = (encomenda) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_E', encomenda })
    }
};