import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { removeProductAction } from "../_actions/product_actions";
import { toast } from "sonner";

type Props = {
  id: number;
};
export default function ProductContinueButton({ id }: Props) {
  return (
    <AlertDialogAction
      onClick={async () => {
        const res = await removeProductAction(id);

        if (res?.error) {
          toast.error(res.error);
        } else if (res?.success) {
          toast.success(res.success);
        }
      }}
    >
      Continue
    </AlertDialogAction>
  );
}
