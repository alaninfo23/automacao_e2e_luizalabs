## Sobre o Projeto
O [Dev.finance$](http://maratona-discover-devfinance.netlify.app/#) é uma aplicação web criada o objetivo de facilitar o controle financeiro pessoal. O sistema permite registrar entradas e saídas financeiras, além de calcular automaticamente o saldo disponível.

Este documento contém os principais **casos de teste funcionais**, validando a usabilidade e funcionamento da aplicação.

## Setup

### Pré-requisitos:
✔️ Instalar o NodeJS \
✔️ Instalar um editor de texto, como o Visual Studio Code \
✔️ Instalar o Git (caso queira trabalhar com projeto em sua máquina)

### Execução

Para executar os testes em sua máquina, você pode baixar esse projeto usando o Github e seguir os passos abaixo:

1. Instalar as dependências configuradas do `package.json`, usando o comando: `npm install`
2. Executar a interface com o comando `npx cypress open`
---

## Casos de Teste do dev.finance$

### Caso de Teste 01 - Adicionar uma Nova Transação
**Objetivo:** Garantir que o sistema permite adicionar uma transação corretamente.

#### **Pré-condições:**
- O usuário acessou o site.
- O campo de transações está vazio ou já possui registros.

#### **Passos:**
1. Clicar no botão **"Nova Transação"**.
2. Preencher o campo **Descrição** com **"Salário"**.
3. Informar o valor **"5000"** no campo **Valor**.
4. Selecionar a data **"10/08/2025"**.
5. Clicar em **"Salvar"**.

#### **Resultado Esperado:**
✔️ A transação **"Salário"** deve aparecer na lista de transações. \
✔️ O saldo deve ser atualizado corretamente, somando o valor. \
✔️ A transação deve ser mantida após recarregar a página.

---

### Caso de Teste 02 - Registrar uma Despesa (Conta de Luz)
**Objetivo:** Verificar se uma despesa pode ser cadastrada corretamente e afeta o saldo.

#### **Pré-condições:**
- O usuário acessou o site.
- O saldo inicial pode estar zerado ou já possuir lançamentos.

#### **Passos:**
1. Clicar no botão **"Nova Transação"**.
2. Preencher o campo **Descrição** com **"Conta de Luz"**.
3. Informar **"-250"** no campo **Valor** (valor negativo para despesa).
4. Selecionar a data **"15/08/2025"**.
5. Clicar em **"Salvar"**.

#### **Resultado Esperado:**
✔️ A transação **"Conta de Luz"** deve aparecer na lista com valor negativo. \
✔️ O saldo deve ser reduzido corretamente. \
✔️ A transação deve ser mantida após recarregar a página.

---

### Caso de Teste 04 - Editar uma Transação
**Objetivo:** Validar se o sistema permite a edição de uma transação cadastrada.

#### **Pré-condições:**
- O usuário acessou o site.
- Existe pelo menos uma transação cadastrada.

#### **Passos:**
1. Identificar uma transação na lista.
2. Clicar no botão de **editar** ao lado da transação.
3. Alterar a descrição para **"Salário Atualizado"**.
4. Modificar o valor para **"5200"**.
5. Clicar em **"Salvar"**.

#### **Resultado Esperado:**
✔️ A transação deve ser atualizada na lista. \
✔️ O saldo deve ser recalculado corretamente. \
✔️ Após recarregar a página, as alterações devem ser mantidas.

---

### Caso de Teste 05 - Excluir uma Transação
**Objetivo:** Verificar se o sistema permite remover uma transação corretamente.

#### **Pré-condições:**
- O usuário acessou o site.
- Existe pelo menos uma transação cadastrada.

#### **Passos:**
1. Identificar uma transação na lista.
2. Clicar no ícone de **lixeira** ao lado da transação.
3. Confirmar a exclusão (se houver um alerta).

#### **Resultado Esperado:**
✔️ A transação deve ser removida da lista imediatamente. \
✔️ O saldo deve ser atualizado corretamente. \
✔️ Após recarregar a página, a transação excluída não deve reaparecer.

---

### Caso de Teste 06 - Validar Campos Obrigatórios na Adição de Transação
**Objetivo:** Verificar se o sistema impede o cadastro de uma transação quando os campos obrigatórios não são preenchidos.

#### **Pré-condições:**
- O usuário acessou o site.
- A página de adição de transação está aberta.

#### **Passos:**
1. Clicar no botão para adicionar uma nova transação.
2. Deixar os campos **Nome**, **Valor** e **Data** em branco.
3. Clicar no botão **Salvar**.

#### **Resultado Esperado:**
✔️ O sistema deve exibir mensagens de erro informando que os campos são obrigatórios.  
✔️ A transação não deve ser salva.  
✔️ Os campos obrigatórios devem ser destacados visualmente (exemplo: borda vermelha ou ícone de erro).

**Autor:** José Alan dos Santos Rocha
