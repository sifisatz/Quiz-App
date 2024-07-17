"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useModalStore from "@/hooks/useModalStore";
import useSettingsForm from "@/hooks/useSettingsForm";
import { useRouter } from "next/navigation";

const ResultModal = () => {
  const { isOpen, type, onClose, additionalData } = useModalStore();
  const { resetSettingFormValues } = useSettingsForm();

  const open = isOpen && type === "showResults";
  const router = useRouter();


  const handleRestart = () => {
    resetSettingFormValues()
    router.push("/");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl">
            Quiz Result
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col items-center py-4 md:py-6">
          <p className="text-lg md:2xl text-primary font-semibold tracking-wide">
            You scored: {`${additionalData?.score}/${additionalData?.limit}00`}
          </p>
          <Button
            onClick={handleRestart}

            className="mt-3 md:mt-5"
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
