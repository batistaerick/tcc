import { LanguageMap } from './types';

const pt: LanguageMap = {
  api: {
    authorize: {
      wrongCredentials:
        'E-mail ou senha inválidos. Certifique-se de que inseriu as credenciais corretamente.',
    },
  },
  addButton: {
    addTransaction: 'Adicionar Transação',
  },
  auth: {
    alreadyHaveAccount: 'Já tem uma conta?',
    email: 'E-mail',
    invalidPassword: `
      A senha deve ter pelo menos 7 caracteres,
      1 letra maiúscula e 1 caractere especial.
    `,
    login: 'Conecte-se',
    newInHere: 'Novo aqui?',
    password: 'Senha',
    signIn: 'Entrar',
    signUp: 'Inscrever-se',
    username: 'Nome de usuário',
  },
  balance: {
    expense: 'Total de Despesas',
    income: 'Total de Receitas',
    totalBalance: 'Balanço',
  },
  categoryOption: {
    chooseCategory: 'Escolha uma categoria',
  },
  dropdownMenu: {
    account: 'Conta',
    settings: 'Ajustes',
    signOut: 'Sair',
  },
  newTransaction: {
    amount: 'Total',
    cancel: 'Cancelar',
    category: 'Categoria',
    expenseOption: 'Despesa',
    fixed: 'É uma despesa ou receita fixa?',
    incomeOption: 'Receita',
    notes: 'Notas (Opcional)',
    save: 'Salvar',
  },
  prediction: 'Predição',
  transactions: {
    expenses: 'Despesas',
    incomes: 'Receitas',
  },
};

export default pt;
