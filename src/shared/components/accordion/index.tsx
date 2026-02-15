"use client";
import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown2 } from 'iconsax-react';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean;
  defaultOpenId?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  multiple = false,
  defaultOpenId,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (multiple) {
        return prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, multiple }}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  accordionItemClass?:string
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children,accordionItemClass }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within an Accordion');
  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(id);

  return (
    <section className="border rounded-lg overflow-hidden">
      
        <button
          type="button"
          onClick={() => toggleItem(id)}
          className={`flex w-full ${accordionItemClass ?? ""} items-center justify-between cursor-pointer p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isOpen ? 'text-pink-500' : ''
          }`}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${id}`}
        >
          <span>{title}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <ArrowDown2 size={16} color={isOpen?"#ff5a7c ":"#6b7280"} />
          </motion.span>
        </button>
      
      <AnimatePresence>
        {isOpen && children}
      </AnimatePresence>
    </section>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  accordionContextClass?:string
}

const AccordionContent: React.FC<AccordionContentProps> = ({ children,accordionContextClass }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden will-change-transform"
    >
      <div className={`p-4 text-gray-600 bg-white ${accordionContextClass ??""}`}>{children}</div>
    </motion.div>
  );
};

export { Accordion, AccordionItem, AccordionContent };