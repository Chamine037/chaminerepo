const initState = {
    operacoes: [
        { id: '123', nome: 'bom dia' },
        { id: '456', nome: 'boa tarde' },
        { id: '789', nome: 'boa noite' }
    ]
}
const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CRIAR_OP':
            //console.log('criado', action.operacao)
            return {
                ...state
            }
    }
    return state;
}

export default projectReducer;