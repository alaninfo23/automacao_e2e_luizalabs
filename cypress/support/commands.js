Cypress.Commands.add('adicionarTransacao', ({ descricao = '', valor = '', data = '' } = {}) => {
    cy.get('a.button.new').click();

    if (descricao) {
        cy.get('input[name="description"]').clear().type(descricao);
    }
    if (valor) {
        cy.get('input[name="amount"]').clear().type(valor);
    }
    if (data) {
        const partesData = data.split('/');
        const dataISO = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
        cy.get('input[name="date"]').clear().type(dataISO);
    }
    cy.get('.input-group.actions').contains('button', 'Salvar').click();
});


Cypress.Commands.add('validarDadosNaTabela', (posicao, descricao, valor, data) => {
    cy.get('#data-table tbody tr').eq(posicao).within(() => {
        cy.get('.data-table__description').should('have.text', descricao);
        cy.get('.data-table__price-income, .data-table__price-expense').invoke('text').then((texto) => {
            cy.log('Texto extraído:', texto); // Adicione esta linha
            const valorFormatado = extrairValor(texto);
            expect(parseFloat(valorFormatado)).to.eq(parseFloat(valor));
        });
        cy.get('.data-table__date').should('have.text', data);
    });
});


Cypress.Commands.add('validarInexistenciaDeDados', (descricao) => {
    cy.contains('.data-table__description', descricao).should('not.exist');
});

Cypress.Commands.add('editarDadosDaTabela', (posicao, { descricao = '', valor = '', data = '' } = {}) => {
    cy.get('#data-table tbody tr').eq(posicao).within(() => {
        cy.get('.data-table-edit').click();
    });
    
    if (descricao) {
        cy.get('input[name="description"]').clear().type(descricao);
    }
    if (valor) {
        cy.get('input[name="amount"]').clear().type(valor);
    }
    if (data) {
        const partesData = data.split('/');
        const dataISO = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
        cy.get('input[name="date"]').clear().type(dataISO);
    }
    cy.get('.input-group.actions').contains('button', 'Salvar').click();
});

Cypress.Commands.add('deletarDadosDaTabela', (posicao) => {
    cy.get('#data-table tbody tr').eq(posicao).within(() => {
        cy.get('img[onclick^="Transaction.remove"]').click();
    });
});

Cypress.Commands.add('validarValorTotal', (valorTotalEsperado) => {
    cy.get('.card__amount').invoke('text').then((texto) => {
        const textoLimpo = extrairValor(texto);
        const valorAtual = parseFloat(textoLimpo);
        expect(valorAtual).to.eq(valorTotalEsperado);
    });
});

Cypress.Commands.add('validarValoresNoPainel', (entradas, saidas, total) => {
    cy.get('.card__income').invoke('text').then((texto) => {
        const valorAtual = extrairValor(texto);
        expect(valorAtual).to.eq(entradas);
    });

    cy.get('.card__expense').invoke('text').then((texto) => {
        const valorAtual = extrairValor(texto);
        expect(valorAtual).to.eq(saidas);
    });

    cy.get('.card__amount').invoke('text').then((texto) => {
        const valorAtual = extrairValor(texto);
        expect(valorAtual).to.eq(total);
    });
});

Cypress.Commands.add('validarMsgCampoObrigatorio', (msgCampoObrigatorio) => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('.input-group.actions').contains('button', 'Salvar').click();
    cy.then(() => {
      expect(stub).to.have.been.calledWith(msgCampoObrigatorio);
    });
});



function extrairValor(texto) {
    const textoLimpo = texto.trim()
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
    return parseFloat(textoLimpo);
}


