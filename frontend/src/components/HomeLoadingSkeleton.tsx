import Button from '@/components/Button';
import DefaultBackground from '@/components/DefaultBackground';

export default function HomeLoadingSkeleton() {
  return (
    <DefaultBackground>
      <header className="h-12 w-10/12 rounded-xl" />
      <div className="h-52 w-10/12 cursor-default rounded-xl bg-slate-700 bg-opacity-60" />
      <div className="h-[252px] w-10/12 rounded-xl bg-blue-950 bg-opacity-65" />
      <div className="h-[252px] w-10/12 rounded-xl bg-blue-950 bg-opacity-65" />
      <Button height="h-12" width="w-10/12" translation="" />
    </DefaultBackground>
  );
}
