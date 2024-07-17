"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useModalStore from "@/hooks/useModalStore";
import useSettingsForm from "@/hooks/useSettingsForm";
import { useRouter } from "next/navigation";

const QuitQuizModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const { resetSettingFormValues } = useSettingsForm();
  const open = isOpen && type === "quitQuiz";
  const router = useRouter();

  const handleRestart = () => {
    resetSettingFormValues()
    router.push("/")
  }
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRestart}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuitQuizModal;
