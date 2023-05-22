import { FaChevronRight } from 'react-icons/fa';
import { FcBearish, FcBullish } from 'react-icons/fc';

export default function Balance() {
  return (
    <div className="flex">
      <div className="bg-indigo-800 w-full h-40 mx-5 rounded-xl">
        <div className="px-10 pt-5 flex justify-between items-center">
          <button>
            <div className="text-left">Total Balance</div>
            <div className="text-left text-3xl">$2,000.00</div>
          </button>
          <FaChevronRight className="cursor-pointer" size={25} />
        </div>
        <div className="flex justify-between px-10 pt-4 text-sm">
          <div className="flex gap-1">
            <FcBearish size={35} />
            <div>
              <div>Expense</div>
              <div>$2,000.00</div>
            </div>
          </div>
          <div className="flex gap-1">
            <FcBullish size={35} />
            <div>
              <div>Income</div>
              <div>$2,000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
