export const criarTipoMaquina = (tipoMaquina) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_TIPOMAQUINA', tipoMaquina })
    }
};