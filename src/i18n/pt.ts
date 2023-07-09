import { LanguageMap } from './types';

const pt: LanguageMap = {
  api: {
    authorize: {
      wrongCredentials:
        'E-mail ou senha inválidos. Certifique-se de que inseriu as credenciais corretamente.',
    },
  },
  auth: {
    alreadyHaveAccount: 'Já tem uma conta?',
    email: 'E-mail',
    login: 'Conecte-se',
    newInHere: 'Novo aqui?',
    password: 'Senha',
    signIn: 'Entrar',
    signUp: 'Inscrever-se',
    username: 'Nome de usuário',
  },
  balance: {
    expense: 'Despesas',
    income: 'Receitas',
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
    category: 'Categoria',
    expenseOption: 'Despesa',
    fixed: 'É uma despesa/receita fixa?',
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
