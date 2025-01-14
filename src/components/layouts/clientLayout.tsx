'use client'
import { NavLink } from '@/data/navLinks';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react'

type ClientLayoutProps = {
    children: React.ReactNode;
}

const ClientLayout = ({children}:ClientLayoutProps) => {
    const pathname = usePathname();
    return (
      <div className={cn({'bg-grey-100': !pathname.includes(NavLink.BookACall),

      }, )}
      style={pathname.includes(NavLink.BookACall) ? {background: "radial-gradient(461.91% 160.49% at 17.47% -33.36%, rgba(215, 14, 134, 0.04) 0%, rgba(36, 56, 139, 0.05) 99.68%)"}: {}}>
{children}
    </div>
  )
};

export default ClientLayout;