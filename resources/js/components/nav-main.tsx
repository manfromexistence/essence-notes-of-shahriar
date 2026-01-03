import { ChevronRight, type LucideIcon } from "lucide-react"
import { useState, useEffect } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Recursive type for nested menu items
type MenuItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: MenuItem[]
}

export function NavMain({
  items,
}: {
  items: MenuItem[]
}) {
  // Load collapsed state from localStorage
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sidebar-nav-state')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return {}
      }
    }
    // Initialize with isActive state
    return items.reduce((acc, item) => {
      acc[item.title] = item.isActive || false
      return acc
    }, {} as Record<string, boolean>)
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('sidebar-nav-state', JSON.stringify(openItems))
  }, [openItems])

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Recursive component for rendering nested sub-items
  const renderSubItems = (subItems: MenuItem[], depth: number = 1) => {
    return subItems.map((subItem) => {
      const hasNestedItems = subItem.items && subItem.items.length > 0

      if (hasNestedItems) {
        // Render as a collapsible nested item
        return (
          <Collapsible
            key={subItem.title}
            asChild
            open={openItems[subItem.title] ?? false}
            onOpenChange={() => toggleItem(subItem.title)}
            className="group/nested-collapsible"
          >
            <SidebarMenuSubItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton className="data-[state=open]:bg-sidebar-accent">
                  <span>{subItem.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/nested-collapsible:rotate-90" />
                </SidebarMenuSubButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderSubItems(subItem.items!, depth + 1)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuSubItem>
          </Collapsible>
        )
      }

      // Render as a simple link item
      return (
        <SidebarMenuSubItem key={subItem.title}>
          <SidebarMenuSubButton asChild>
            <a href={subItem.url}>
              <span>{subItem.title}</span>
            </a>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      )
    })
  }

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Admin Panel</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={openItems[item.title] ?? item.isActive}
            onOpenChange={() => toggleItem(item.title)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items && renderSubItems(item.items)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
