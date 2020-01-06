export const criarLinhasProducao = (linhaproducao) => {
    return (dispatch, getState) => {
        //async to base dados
        dispatch({ type: 'CRIAR_LINHASPRODUCAO', linhaproducao })
    }
};