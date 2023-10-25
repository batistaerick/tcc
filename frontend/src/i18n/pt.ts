import { LanguageMap } from './types';

const pt: LanguageMap = {
  api: {
    differentPasswords: 'As senhas devem ser iguais.',
    invalidUsername:
      'O nome de usuário deve ter no máximo 30 caracteres e pode conter apenas letras, números, hifens e sublinhados.',
    missingCredentials: 'Forneça seu e-mail e senha.',
    wrongCredentials:
      'Credenciais inválidas. Verifique novamente seu e-mail e senha e tente novamente.',
  },
  account: {
    username: 'Nome de usuário',
    newPassword: 'Nova senha',
    confirmPassword: 'Confirmar senha',
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
    signOut: 'Sair',
  },
  newTransaction: {
    value: 'Valor',
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
