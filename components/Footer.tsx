import Image from "next/image";
import { footerLinks } from ".";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

type renderFooterColumnsProps = {
  start: number;
  end: number;
};

const FooterColumn = ({ title, links }: ColumnProps) => {
  return (
    <div className="flex-1 flex flex-col gap-3 text-sm min-w-max">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link href="/" key={link}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
}; 

const renderFooterColumns = ({ start, end }: renderFooterColumnsProps) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {footerLinks.slice(start, end).map((footerLink, index) => (
        <FooterColumn
          key={index}
          title={footerLink.title}
          links={footerLink.links}
        />
      ))}
    </div>
  );
};

// const getCurrenYear=()=>{
//   const currentYear
// }

const Footer = () => {
  return (
    <footer className="flex items-center justify-start flex-col lg:px-20 py-6 px-5 w-full gap-20 bg-light-white">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="/pixel pulse-logos_black.png"
            width={115}
            height={38}
            alt="logo-purple"
          />
          <p className="text-start text-sm font-normal mt-5 max-w-xsPixel puls">
            PixelPulse is a global hub where artists and innovators come
            together to exchange ideas, foster growth, and connect for exciting
            opportunities
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {/* <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          /> */}
          {renderFooterColumns({ start: 0, end: 1 })}
          {renderFooterColumns({ start: 1, end: 3 })}
          {renderFooterColumns({ start: 3, end: 4 })}
          {renderFooterColumns({ start: 4, end: 6 })}
          {renderFooterColumns({ start: 6, end: 7 })}
        </div>
      </div>
      <div className="flex justify-between items-center max-sm:flex-col w-full text-sm font-normal">
        <p>
          &copy; {new Date().getFullYear()} PixelPulse.Inc. All right reserved.
        </p>
        <p className="text-gray"><span className="text-black">15,520</span> projects shas been submitted</p>
      </div>
    </footer>
  );
};

export default Footer;
