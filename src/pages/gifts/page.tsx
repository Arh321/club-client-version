import GiftsContainerList from "@/components/gifts-page/giftsListContainer";
import PagesContainer from "@/components/pages-container/pages-container";

const GiftsPage = () => {
  return (
    <PagesContainer>
      <div className="w-full h-full flex flex-col custome-scrool-bar overflow-y-auto gap-4 pt-4 sm:px-6 lsm:px-8 pb-[100px]">
        <GiftsContainerList />
      </div>
    </PagesContainer>
  );
};

export default GiftsPage;
