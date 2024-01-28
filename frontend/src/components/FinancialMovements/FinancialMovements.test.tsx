import FinancialMovements from '@/components/FinancialMovements/FinancialMovements';
import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import { KeyedMutator } from 'swr';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FinancialMovements component', () => {
  const mockMutateOnDelete: KeyedMutator<any> = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the financial movement item correctly', () => {
    const { getByText, getByTestId } = render(
      <RecoilRoot>
        <FinancialMovements
          id="1"
          category="Category"
          amount={100}
          type="fixed"
          mutateOnDelete={mockMutateOnDelete}
        />
      </RecoilRoot>
    );

    const categoryElement = getByText('Category');
    const amountElement = getByText('R$ 100,00');
    const deleteIconElement = getByTestId('delete-icon');

    expect(categoryElement).toBeInTheDocument();
    expect(amountElement).toBeInTheDocument();
    expect(deleteIconElement).toBeInTheDocument();
  });

  it('should call the delete endpoint and mutation functions when delete icon is clicked', async () => {
    mockedAxios.delete.mockResolvedValueOnce({});
    const { getByTestId } = render(
      <RecoilRoot>
        <FinancialMovements
          id="1"
          category="Category"
          amount={100}
          type="fixed"
          mutateOnDelete={mockMutateOnDelete}
        />
      </RecoilRoot>
    );

    const deleteIconElement = getByTestId('delete-icon');
    fireEvent.click(deleteIconElement);

    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/fixed-transactions', {
      params: { id: '1', type: 'fixed' },
    });

    await waitFor(() => {
      expect(mockMutateOnDelete).toHaveBeenCalled();
    });
  });
});
