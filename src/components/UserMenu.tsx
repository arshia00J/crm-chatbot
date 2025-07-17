'use client'

import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useAuthStore } from '@/stores/useAuthStore'

export default function UserMenu() {
  const email = useAuthStore((state) => state.email)
  const clearToken = useAuthStore((state) => state.clearAuth)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    clearToken()
    handleClose()
  }

  return (
    <div >
      <div
        onClick={handleOpen}
        className="flex flex-row items-center gap-4 cursor-pointer"
      >
        <div className="flex gap-3 items-center">
          <AccountCircleIcon />
          <p className="text-[#1E293B] font-bold text-[16px]">
            {email ?? 'Guest'}
          </p>
        </div>
        <KeyboardArrowDownRoundedIcon />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'user-menu-button',
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
