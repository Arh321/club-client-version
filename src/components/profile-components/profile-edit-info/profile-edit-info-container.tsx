import React, { useEffect } from "react";
import { Drawer } from "antd";
import ProfileEditMandatoryForm from "./profile-edit-mandatory";
import { IadditionalInfo, IMandatory, IProfileInfo } from "@/types/profile";
import style from "./profile-edit-info.module.css";
import ProfileEditAdditionalForm from "./profile-complete-info-edit";

interface ProfileEditInfoContainerProps {
  open: boolean;
  onClose: () => void;
  info: IProfileInfo;
  sectionNameToEdit: "defaultAddress" | "additional" | "mandatory" | string;
  updateProfileInfo: (
    mandatory?: IMandatory,
    additional?: IadditionalInfo
  ) => Promise<void>;
  loading: boolean;
}

const ProfileEditInfoContainer: React.FC<ProfileEditInfoContainerProps> = ({
  onClose,
  open,
  info,
  sectionNameToEdit,
  loading,
  updateProfileInfo,
}) => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (open) {
        onClose(); // Close the modal
        event.preventDefault(); // Prevent the default back behavior
        window.history.pushState(null, ""); // Push state to avoid exiting the page
      }
    };

    if (open) {
      window.history.pushState(null, ""); // Push a new state to the history stack
      window.addEventListener("popstate", handlePopState); // Listen for the back button
    }

    return () => {
      window.removeEventListener("popstate", handlePopState); // Cleanup the event listener
    };
  }, [open]);

  return (
    <div>
      <Drawer
        placement={"bottom"}
        width={500}
        classNames={{
          wrapper: "!h-max ",
          mask: "",
          content:
            "!h-full rounded-t-[10px] !p-0 !max-h-[80dvh] overflow-y-auto",
          header: "!hidden",
          body: "!p-[10px]",
        }}
        onClose={onClose}
        open={open}
      >
        {sectionNameToEdit == "mandatory" && (
          <ProfileEditMandatoryForm
            headerTitle={"ویرایش اطلاعات کاربری"}
            mandatory={info.mandatory}
            style={style}
            loading={loading}
            updateProfileInfo={updateProfileInfo}
          />
        )}
        {sectionNameToEdit == "additional" && (
          <ProfileEditAdditionalForm
            headerTitle={"ویرایش اطلاعات تکمیلی"}
            additional={info.additional}
            style={style}
            loading={loading}
            updateProfileInfo={updateProfileInfo}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ProfileEditInfoContainer;
