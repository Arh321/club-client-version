"use client";
import PagesContainer from "@/components/pages-container/pages-container";

import {
  ProfileInfoSectionLazy,
  ProfileInfoAddressSectionLazy,
  ProfileCompleteInfoSectionLazy,
  ProfileFirstViewComponentLazy,
} from "@/components/profile-components/profile-info-section/profile-cards-lazy";
import { ProfileSliceType } from "@/redux/profile/profileSlice";
import { RootState } from "@/redux/store";
import { Suspense } from "react";

import { useSelector } from "react-redux";
import AppLoading from "../loading";
import { Skeleton } from "antd";
import useEditProfile from "@/hooks/useEditProfile";
import ProfileEditInfoContainer from "@/components/profile-components/profile-edit-info/profile-edit-info-container";

const ProfilePage = () => {
  const {
    onClose,
    open,
    showEditModal,
    sectionNameToEdit,
    loadingUpdate,
    updateProfileInfo,
  } = useEditProfile();
  const { info, loadingProfile } = useSelector<RootState, ProfileSliceType>(
    (state) => state.profileSlice
  );
  if (loadingProfile || !info)
    return (
      <PagesContainer>
        <div className="w-full h-full overflow-y-auto pt-[16px]  flex flex-col pb-[100px]">
          <div className="w-full h-[102px] flex items-center justify-between gap-[10px]">
            <Skeleton.Node className="!flex !w-[23px] !h-[102px]" active />

            <Skeleton.Node className="!flex !w-full !h-[102px]" active />
            <Skeleton.Node className="!flex !w-[23px] !h-[102px]" active />
          </div>

          <div className="p-[32px] w-full flex flex-col gap-[10px] max-h-[1066px] overflow-hidden">
            <div className="w-full h-[302px] rounded-[10px] p-[10px]">
              <Skeleton.Node className="!flex !w-full !h-full" active />
            </div>
            <div className="w-full h-[302px] rounded-[10px] p-[10px]">
              <Skeleton.Node className="!flex !w-full !h-full" active />
            </div>
            <div className="w-full h-[302px] rounded-[10px] p-[10px]">
              <Skeleton.Node className="!flex !w-full !h-full" active />
            </div>
          </div>
        </div>
      </PagesContainer>
    );

  if (info)
    return (
      <PagesContainer>
        <Suspense fallback={<AppLoading />}>
          <div className="w-full h-full overflow-y-auto pt-[16px]  flex flex-col pb-[100px]">
            <ProfileFirstViewComponentLazy
              name={info.mandatory.firstName}
              familyName={info.mandatory.lastName}
              level={
                info.immutable.rankingPoints
                  ? info.immutable.rankingPoints.points.toString()
                  : "0"
              }
              levelId={0}
            />
            <div className="p-[32px] w-full flex flex-col gap-[10px] max-h-[1066px] overflow-hidden">
              <ProfileInfoSectionLazy
                headerTitle="اطلاعات کاربری"
                mandatory={info.mandatory}
                cellPhone={info.immutable.phone}
                showEditModal={showEditModal}
              />
              <ProfileCompleteInfoSectionLazy
                headerTitle="اطلاعات تکمیلی"
                additional={info.additional}
                showEditModal={showEditModal}
              />
              <ProfileInfoAddressSectionLazy
                headerTitle="اطلاعات سکونت"
                defaultAddress={info.defaultAddress}
              />
            </div>
            <ProfileEditInfoContainer
              open={open}
              onClose={onClose}
              info={info}
              sectionNameToEdit={sectionNameToEdit}
              loading={loadingUpdate}
              updateProfileInfo={updateProfileInfo}
            />
          </div>
        </Suspense>
      </PagesContainer>
    );
};

export default ProfilePage;
