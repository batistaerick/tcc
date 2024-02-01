import { LanguageMap } from '@/i18n/types';

const pt: LanguageMap = {
  api: {
    differentPasswords: 'As senhas devem ser iguais.',
    invalidUsername:
      'O nome de usuário deve ter no máximo 30 caracteres e pode conter apenas letras, números, hifens e sublinhados.',
    missingCredentials: 'Forneça seu e-mail e senha.',
    wrongCredentials:
      'Credenciais inválidas. Verifique novamente seu e-mail e senha e tente novamente.',
    existingEmail:
      'O e-mail que você forneceu já está cadastrado. Por favor, use um endereço de e-mail diferente para se inscrever ou faça login.',
    invalidPassword:
      'A senha deve ter pelo menos sete caracteres, um número 1, letra maiúscula/minuscula e 1 caractere especial.',
    error: 'Erro',
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
    incomeOption: 'Receita',
    fixedExpenseOption: 'Despesa Fixa',
    fixedIncomeOption: 'Receita Fixa',
    chooseType: 'Selecione o tipo',
    transactionType: 'Escolha o tipo de transação',
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
