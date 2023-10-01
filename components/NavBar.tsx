import Image from "next/image";
import Link from "next/link";
import { NavLinks } from ".";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";

const NavBar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center py-5 px-8 border-b border-nav-border gap-4">
      <div className="flex-1 flex items-center justify-start gap-10">
        <Link href="/">
          <Image
            src="/pixel pulse-logos_black.png"
            alt="logo"
            width={115}
            height={43}
          />
        </Link>
        <ul className="xl:flex hidden text-sm font-medium gap-7">
          {NavLinks.map((index) => (
            <Link href={index.href} key={index.key}>
              {index.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center gap-4">
        {session?.user ? (
          <>
          <ProfileMenu session={session}/>
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
