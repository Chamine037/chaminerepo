export const criarMaquina = (maquina) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_MAQUINA', maquina })
    }
};