describe('Cadastro de transações financeiras no dev.finance', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Adicionar uma nova transação com sucesso', () => {
    cy.adicionarTransacao({
      descricao: 'Salário',
      valor: '5000',
      data: '01/04/2025'
    });
    cy.validarDadosNaTabela(0, 'Salário', 5000, '01/04/2025');
    cy.validarValoresNoPainel(5000, 0, 5000)

    cy.adicionarTransacao({
      descricao: 'Bonus',
      valor: '500',
      data: '01/04/2025'
    });
    cy.validarDadosNaTabela(1, 'Bonus', 500, '01/04/2025');
    cy.validarValoresNoPainel(5500, 0, 5500)
  });

  it('Registrar uma despesa corretamente', () => {
    cy.adicionarTransacao({
      descricao: 'Salário',
      valor: '5000',
      data: '01/04/2025'
    });

    cy.adicionarTransacao({
      descricao: 'Conta de Luz',
      valor: '-250',
      data: '01/04/2025'
    });
    cy.validarDadosNaTabela(1, 'Conta de Luz', -250, '01/04/2025');
    cy.validarValoresNoPainel(5000, -250, 4750)
  });

  it('Editar uma transação cadastrada', () => {
    cy.adicionarTransacao({
      descricao: 'Salário',
      valor: '5000',
      data: '01/04/2025'
    });
    
    cy.editarDadosDaTabela(0, {
      descricao: 'Salário',
      valor: '6000',
      data: '01/04/2025'
    })

    cy.validarDadosNaTabela(0, 'Salário', 6000, '01/04/2025');
    cy.validarValoresNoPainel(6000, 0, 6000)
  });

  it('Excluir uma transação cadastrada', () => {
    cy.adicionarTransacao({
      descricao: 'Salário',
      valor: '5000',
      data: '01/04/2025'
    });

    cy.deletarDadosDaTabela(0)
    cy.validarInexistenciaDeDados('Salário');
    cy.validarValoresNoPainel(0, 0, 0)
  });

  it('Validar campos obrigatórios na adição de transação', () => {
    cy.adicionarTransacao({
      valor: '5000',
      data: '01/04/2025'
    });
    cy.validarMsgCampoObrigatorio('Porfavor preencha todos os campos')
    cy.get('a.button.cancel').click();

    cy.adicionarTransacao({
      descricao: 'Salário',
      data: '01/04/2025'
    });
    cy.validarMsgCampoObrigatorio('Porfavor preencha todos os campos')
    cy.get('a.button.cancel').click();

    cy.adicionarTransacao({
      descricao: 'Salário',
      valor: '5000',
    });
    cy.validarMsgCampoObrigatorio('Porfavor preencha todos os campos')
    cy.get('a.button.cancel').click();
  });

});
