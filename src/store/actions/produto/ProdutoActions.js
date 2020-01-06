export const criarProduto = (produto) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_P', produto })
    }
};