import { IoMdAddCircle } from 'react-icons/io';

export default function AddButton() {
  return (
    <div className="fixed bottom-4 right-0 p-3">
      <IoMdAddCircle className="text-indigo-800 cursor-pointer" size={50} />
    </div>
  );
}
