export const criarCliente = (cliente) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_CLIENTE', cliente })
    }
};