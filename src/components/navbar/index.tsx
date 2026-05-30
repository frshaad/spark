import { Search } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import MobileNavWrapper from './mobile-nav-wrapper'
import NavButtons from './nav-buttons'
import ProfileButton from './profile-button'

export default function Navbar() {
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <aside className='hidden max-w-md flex-col justify-between pr-6 pl-10 lg:flex lg:pb-6'>
        <Logo />

        <nav className='flex flex-col max-lg:gap-3'>
          <NavButtons />
        </nav>

        <ProfileButton />
      </aside>

      {/* Mobile/Tablet Navigation - Uses client component for scroll detection */}
      <MobileNavWrapper
        headerContent={
          <>
            <Logo />

            <div className='flex items-center gap-5'>
              <Link href='/search'>
                <Button variant='ghost' size='icon-lg'>
                  <Search className='size-5' />
                  <span className='sr-only'>Search</span>
                </Button>
              </Link>

              <ProfileButton />
            </div>
          </>
        }
        bottomNavContent={<NavButtons />}
      />
    </>
  )
}
