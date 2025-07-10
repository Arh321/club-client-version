import { useNotify } from "@/components/notife/notife";
import { onLoadingProfile, onSetProfile } from "@/redux/profile/profileSlice";
import { IadditionalInfo, IMandatory } from "@/types/profile";
import { getProfile, updateProfile } from "@/utils/userServise";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export interface OpenEditPayload {
  sectionName: "defaultAddress" | "additional" | "mandatory";
  inputId: string;
  show: boolean;
}

const useEditProfile = () => {
  const [sectionNameToEdit, setSectionNameToEdit] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { notify } = useNotify();
  const cookies = new Cookies();

  /**
   * Fetch the latest user profile and update Redux state.
   */
  const getUserProfile = useCallback(async () => {
    dispatch(onLoadingProfile(true));
    try {
      const response = await getProfile();
      if (response.status) {
        dispatch(onSetProfile(response.result));
      } else {
        throw new Error(
          response.statusMessage || "خطا در دریافت اطلاعات کاربر"
        );
      }
    } catch (error) {
      notify("error", error.message);
      cookies.remove("token");
      router.push("/login");
    } finally {
      dispatch(onLoadingProfile(false));
    }
  }, [dispatch, router, notify, cookies]);

  /**
   * Update profile information.
   * @param mandatory Updated mandatory user data.
   * @param additional Updated additional user data.
   */
  const updateProfileInfo = async (
    mandatory?: IMandatory,
    additional?: IadditionalInfo
  ) => {
    setLoadingUpdate(true);
    try {
      const payload =
        sectionNameToEdit === "mandatory" ? { mandatory } : { additional };
      const response = await updateProfile(payload);

      if (response && response.status) {
        notify("success", response.statusMessage);
        getUserProfile();
        onClose();
      } else {
        if (response.errors) {
          Object.values(response.errors).forEach((message) =>
            notify("error", message)
          );
        } else {
          notify(
            "error",
            response.statusMessage || "ویرایش اطلاعات کاربری با خطا مواجه شد"
          );
        }
        // console.log(response);
      }
    } catch {
      notify("error", "ویرایش اطلاعات کاربری با خطا مواجه شد");
    } finally {
      setLoadingUpdate(false);
    }
  };

  /**
   * Open the edit modal.
   * @param payload Payload containing section name and input ID.
   */
  const showEditModal = ({ sectionName }: OpenEditPayload) => {
    setSectionNameToEdit(sectionName);
    setOpen(true);
  };

  /**
   * Close the edit modal.
   */
  const onClose = () => setOpen(false);

  return {
    open,
    sectionNameToEdit,
    loadingUpdate,
    updateProfileInfo,
    showEditModal,
    onClose,
  };
};

export default useEditProfile;
