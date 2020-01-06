export const criarPlanoFabrico = (planoFabrico) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_PF', planoFabrico })
    }
};