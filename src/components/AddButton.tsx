import { useRouter } from 'next/navigation';
import { IoMdAddCircle } from 'react-icons/io';

export default function AddButton() {
  const { push } = useRouter();

  return (
    <div className="flex w-full cursor-pointer items-center justify-center">
      <div className="flex w-[350px] justify-end md:w-[700px]">
        <IoMdAddCircle
          className="text-indigo-800 transition-colors duration-500 hover:text-indigo-900"
          size={45}
          onClick={() => push('/transactions')}
        />
      </div>
    </div>
  );
}
