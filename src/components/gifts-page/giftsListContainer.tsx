import { motion, AnimatePresence } from "framer-motion";

import { memo, useMemo } from "react";
import { Skeleton } from "antd";

import useUserGiftCards from "@/hooks/useGetGiftsLabels";
import { lazyWithFallback } from "../shared-components/lazyWithFallback/lazyWithFallback";

const GiftListItemComponent = lazyWithFallback(() => import("./giftListItem"), {
  fallback: (
    <div className="w-full aspect-[22/14]">
      <Skeleton.Node active className="w-full !h-full rounded-[10px]" />
    </div>
  ),
});

const listVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const GiftsContainerList = () => {
  const { data, isFetching, isError } = useUserGiftCards();

  const labels = useMemo(() => {
    const res = data?.result;
    return res ?? [];
  }, [data]);

  if (isFetching)
    return (
      <div className="w-full flex flex-col gap-[12px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton.Node
            key={index}
            className="!flex !w-full !h-full aspect-[22/10] rounded-[10px]"
            active
          />
        ))}
      </div>
    );

  if (isError || labels.length === 0) return null;

  return (
    <motion.ul
      className="w-full flex flex-col gap-[12px]"
      variants={listVariants}
      initial="initial"
      animate="animate"
      layout
    >
      <AnimatePresence initial={false}>
        {labels.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            exit="exit"
            layout
            className="w-full"
          >
            <GiftListItemComponent gift={item} index={index} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default memo(GiftsContainerList);
