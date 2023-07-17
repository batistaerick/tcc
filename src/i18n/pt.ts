import { LanguageMap } from './types';

const pt: LanguageMap = {
  api: {
    emailTaken:
      'O e-mail que você forneceu já está cadastrado. Por favor, use um endereço de e-mail diferente para se inscrever.',
    invalidEmail:
      'O formato de e-mail fornecido é inválido. Por favor insira um endereço de e-mail válido.',
    invalidPassword:
      'A senha deve ter pelo menos 7 caracteres, 1 letra maiúscula e 1 caractere especial.',
    missingCredentials: 'Forneça seu e-mail e senha.',
    wrongCredentials:
      'Credenciais inválidas. Verifique novamente seu e-mail e senha e tente novamente.',
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
    expense: 'Total de Despesas',
    income: 'Total de Receitas',
    totalBalance: 'Balanço',
  },
  button: {
    newTransaction: 'Nova Transação',
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
