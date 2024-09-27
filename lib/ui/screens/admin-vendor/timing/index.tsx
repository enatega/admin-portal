import TimingAddForm from "@/lib/ui/screen-components/protected/timing/add-form";
import TimingHeader from "@/lib/ui/screen-components/protected/timing/view/header";

const TimingScreen = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden p-3">
      <TimingHeader />
      <TimingAddForm />
    </div>
  );
};

export default TimingScreen;
