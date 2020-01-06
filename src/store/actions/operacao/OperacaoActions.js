export const criarOperacao = (operacao) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_OP', operacao })
    }
};