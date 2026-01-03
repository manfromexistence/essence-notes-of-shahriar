"use client"

import * as React from "react"
import {
  Home,
  BookOpen,
  Newspaper,
  Calendar,
  Video,
  Cpu,
  Heart,
  Sparkles,
  Award,
  User,
  Briefcase,
  BarChart3,
  Layout,
  GalleryVerticalEnd,
  MessageSquare,
  Lightbulb,
  Menu,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePage } from "@inertiajs/react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  teams: [
    {
      name: "Shahriar Portfolio",
      logo: "/assets/about_me/about_me_banner.png",
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: Layout,
      isActive: true,
      items: [
        {
          title: "Landing Page",
          url: "/admin/index-page",
        },
        {
          title: "Hero Sections",
          url: "/admin/hero-sections",
        },
        {
          title: "Statistics",
          url: "/admin/statistics",
        },
        {
          title: "Social Media Links",
          url: "/admin/social-media-links",
        },
        {
          title: "Menu Items",
          url: "/admin/menu-items",
        },
      ],
    },
    {
      title: "About Me",
      url: "/admin/about-sections",
      icon: User,
      items: [
        {
          title: "Page Settings",
          url: "/admin/about-sections",
        },
        // {
        //   title: "Banner Section",
        //   url: "/admin/about-sections/banner",
        // },
        // {
        //   title: "Report Section",
        //   url: "/admin/about-sections/report",
        // },
        // {
        //   title: "Awards Section",
        //   url: "/admin/about-sections/awards",
        // },
        // {
        //   title: "Story Section",
        //   url: "/admin/about-sections/story",
        // },
        // {
        //   title: "Impact Section",
        //   url: "/admin/about-sections/impact",
        // },
        // {
        //   title: "Travel Section",
        //   url: "/admin/about-sections/travel",
        // },
        // {
        //   title: "Corporate Section",
        //   url: "/admin/about-sections/corporate",
        // },
        // {
        //   title: "Associates Section",
        //   url: "/admin/about-sections/associates",
        // },
        // {
        //   title: "Awards",
        //   url: "/admin/awards",
        // },
        // {
        //   title: "Certificates",
        //   url: "/admin/certificates",
        // },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Newspaper,
      items: [
        {
          title: "All Blog Posts",
          url: "/admin/blogs",
        },
        {
          title: "Create New Post",
          url: "/admin/blogs/create",
        },
        {
          title: "Banner Settings",
          url: "/admin/blogs-page-settings/banner",
        },
        {
          title: "Section Settings",
          url: "/admin/blogs-page-settings/sections",
        },
      ],
    },
    {
      title: "Books",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All Books",
          url: "/admin/books",
        },
        {
          title: "Add New Book",
          url: "/admin/books/create",
        },
        {
          title: "Banner Carousel",
          url: "/admin/book-banner-slides",
        },
        {
          title: "Banner Settings",
          url: "/admin/books-page-settings/banner",
        },
        {
          title: "Content Settings",
          url: "/admin/books-page-settings/content",
        },
        {
          title: "Section Settings",
          url: "/admin/books-page-settings/sections",
        },
      ],
    },
    {
      title: "Contact",
      url: "/admin/contacts",
      icon: MessageSquare,
      items: [
        {
          title: "All Messages",
          url: "/admin/contacts",
        },
        {
          title: "Page Settings",
          url: "/admin/contact-page-settings",
        },
      ],
    },
    {
      title: "Donations",
      url: "#",
      icon: Heart,
      items: [
        {
          title: "All Donations",
          url: "/admin/donations",
        },
        {
          title: "Donation Records",
          url: "/admin/donation-records",
        },
        {
          title: "Create Donation",
          url: "/admin/donations/create",
        },
        {
          title: "Banner Settings",
          url: "/admin/donation-page-settings/banner",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "All Events",
          url: "/admin/events",
        },
        {
          title: "Create Event",
          url: "/admin/events/create",
        },
        {
          title: "Page Settings",
          url: "/admin/events-page-settings",
        },
      ],
    },
    {
      title: "Entrepreneurship",
      url: "#",
      icon: Lightbulb,
      items: [
        {
          title: "Page Settings",
          url: "/admin/entrepreneurship-page-settings",
        },
      ],
    },
    {
      title: "Life Events",
      url: "#",
      icon: Sparkles,
      items: [
        {
          title: "All Life Events",
          url: "/admin/life-events",
        },
        {
          title: "Add Life Event",
          url: "/admin/life-events/create",
        },
        {
          title: "Banner Settings",
          url: "/admin/life-events-page-settings/banner",
        },
        {
          title: "Timeline Settings",
          url: "/admin/life-events-page-settings/timeline",
        },
      ],
    },
    {
      title: "Technology",
      url: "#",
      icon: Cpu,
      items: [
        {
          title: "All Technologies",
          url: "/admin/technologies",
        },
        {
          title: "Add Technology",
          url: "/admin/technologies/create",
        },
        {
          title: "Page Settings",
          url: "/admin/technology-page-settings",
        },
      ],
    },
    {
      title: "Videos",
      url: "#",
      icon: Video,
      items: [
        {
          title: "All Videos",
          url: "/admin/videos",
        },
        {
          title: "Add New Video",
          url: "/admin/videos/create",
        },
        {
          title: "Banner Settings",
          url: "/admin/videos-page-settings/banner",
        },
        {
          title: "Content Settings",
          url: "/admin/videos-page-settings/content",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Frontend Pages",
      url: "/",
      icon: Home,
    },
    {
      name: "Analytics",
      url: "#",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get shared props from Inertia
  const page = usePage()
  const auth = (page.props as any).auth
  const userTeams = (page.props as any).userTeams || []

  const sidebarUser = {
    name: auth?.user?.name || "Guest",
    email: auth?.user?.email || "",
    avatar: auth?.user?.avatar || null,
  }

  // Always show at least the default team
  const teamsToShow = userTeams.length > 0 ? userTeams : data.teams

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teamsToShow} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
