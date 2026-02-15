import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  containerClassName?: string;
  linkClassName?: string;
  textClassName?: string;
  seperatorClassName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = ">",
  containerClassName = "",
  linkClassName = "",
  textClassName = "",
  seperatorClassName = "",
}) => {
  return (
    <nav
      className={`breadcrumb-container ${containerClassName}`}
      aria-label="breadcrumb"
    >
      <ol className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {items?.map((item, index) => (
          <li key={index}>
            {item?.href ? (
              <Link
                href={item?.href}
                title={item?.label}
                className={`breadcrumb-link ${linkClassName}`} 
              >
                {item?.label}
              </Link>
            ) : (
              <span className={`breadcrumb-text ${textClassName}`}>
                {item?.label}
              </span>
            )}

            {index < items?.length - 1 && (
              <span className={`breadcrumb-separator mx-2 ${seperatorClassName}`}>{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
