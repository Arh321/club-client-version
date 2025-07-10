"use client";
import InvoiceListItem from "./invoice-list-item";
import { IInvoice } from "@/types/invoice";
import { motion, AnimatePresence } from "framer-motion";

interface InvoicesListContainerProps {
  data: IInvoice[];
}

const InvoicesListContainer: React.FC<InvoicesListContainerProps> = ({
  data,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="w-full flex flex-col gap-[12px]"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <AnimatePresence>
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <InvoiceListItem index={index} invoice={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default InvoicesListContainer;
